const db = require('../config/db');

// GET ALL REQUESTS
exports.getRequests = (req, res) => {

  const sql = `
    SELECT 
      rr.*,
      v.name AS victim_name,
      v.disaster_area

    FROM resource_requests rr

    JOIN victims v
      ON rr.victim_id = v.victim_id

    ORDER BY FIELD(
      rr.priority_level,
      'critical',
      'high',
      'medium',
      'low'
    )
  `;

  db.query(sql, (err, results) => {

    if (err) {

      return res.status(500).json({
        error: 'Server error'
      });

    }

    res.json(results);

  });

};

// ADD REQUEST + AUTO MATCH
exports.addRequest = (req, res) => {

  const {
    victim_id,
    resource_type,
    quantity_needed,
    priority_level
  } = req.body;

  // STEP 1 → INSERT REQUEST

  const insertRequestSql = `
    INSERT INTO resource_requests
    (
      victim_id,
      resource_type,
      quantity_needed,
      priority_level
    )
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    insertRequestSql,
    [
      victim_id,
      resource_type,
      quantity_needed,
      priority_level
    ],
    (err, requestResult) => {

      if (err) {

        return res.status(500).json({
          error: 'Failed to create request'
        });

      }

      const requestId = requestResult.insertId;

      // STEP 2 → AUTO MATCH LOGIC

      const matchSql = `
        SELECT *
        FROM donations

        WHERE resource_type = ?
        AND status = 'available'
        AND quantity >= ?

        ORDER BY quantity DESC

        LIMIT 1
      `;

      db.query(
        matchSql,
        [resource_type, quantity_needed],
        (err, donationResults) => {

          if (err) {

            return res.status(500).json({
              error: 'Matching failed'
            });

          }

          // NO MATCH FOUND

          if (donationResults.length === 0) {

            return res.status(201).json({
              message:
                'Request created but no matching donation found'
            });

          }

          const donation = donationResults[0];

          // STEP 3 → CREATE MATCH

          const createMatchSql = `
            INSERT INTO matches
            (
              donation_id,
              request_id,
              matched_quantity,
              delivery_status
            )
            VALUES (?, ?, ?, 'pending')
          `;

          db.query(
            createMatchSql,
            [
              donation.donation_id,
              requestId,
              quantity_needed
            ],
            (err, matchResult) => {

              if (err) {

                return res.status(500).json({
                  error: 'Failed to create match'
                });

              }

              // STEP 4 → UPDATE DONATION STATUS

              const updateDonationSql = `
                UPDATE donations
                SET status = 'assigned'
                WHERE donation_id = ?
              `;

              db.query(
                updateDonationSql,
                [donation.donation_id]
              );

              // STEP 5 → UPDATE REQUEST STATUS

              const updateRequestSql = `
                UPDATE resource_requests
                SET status = 'matched'
                WHERE request_id = ?
              `;

              db.query(
                updateRequestSql,
                [requestId]
              );

              // SUCCESS RESPONSE

              res.status(201).json({

                message:
                  'Request created and auto matched successfully',

                matchedDonation:
                  donation.donation_id

              });

            }
          );

        }
      );

    }
  );

};