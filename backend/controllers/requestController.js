const db = require('../config/db');

// Get all requests
exports.getRequests = (req, res) => {

  const sql = `
    SELECT 
      rr.*,
      v.name as victim_name,
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

// Add request + auto matching
exports.addRequest = (req, res) => {

  const {
    victim_id,
    resource_type,
    quantity_needed,
    priority_level
  } = req.body;

  // Step 1 — insert request

  const requestSql = `
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

    requestSql,

    [
      victim_id,
      resource_type,
      quantity_needed,
      priority_level
    ],

    (err, result) => {

      if (err) {

        return res.status(500).json({
          error: 'Server error'
        });

      }

      const request_id = result.insertId;

      // Step 2 — find matching donation

      const donationSql = `
        SELECT *
        FROM donations

        WHERE resource_type = ?
        AND status = 'available'
        AND quantity >= ?

        LIMIT 1
      `;

      db.query(

        donationSql,

        [
          resource_type,
          quantity_needed
        ],

        (err2, donations) => {

          if (err2) {

            return res.status(500).json({
              error: 'Server error'
            });

          }

          // No donation found

          if (donations.length === 0) {

            return res.status(201).json({

              message:
                'Request added. No matching donation available yet.'

            });

          }

          const donation = donations[0];

          // Step 3 — create match

          const matchSql = `
            INSERT INTO matches
            (
              donation_id,
              request_id,
              matched_quantity
            )
            VALUES (?, ?, ?)
          `;

          db.query(

            matchSql,

            [
              donation.donation_id,
              request_id,
              quantity_needed
            ],

            (err3) => {

              if (err3) {

                return res.status(500).json({
                  error: 'Server error'
                });

              }

              // Step 4 — update donation status

              const updateDonationSql = `
                UPDATE donations
                SET status = 'assigned'
                WHERE donation_id = ?
              `;

              db.query(

                updateDonationSql,

                [donation.donation_id],

                () => {

                  // Step 5 — update request status

                  const updateRequestSql = `
                    UPDATE resource_requests
                    SET status = 'matched'
                    WHERE request_id = ?
                  `;

                  db.query(

                    updateRequestSql,

                    [request_id],

                    () => {

                      res.status(201).json({

                        message:
                          'Request added and auto matched successfully'

                      });

                    }

                  );

                }

              );

            }

          );

        }

      );

    }

  );

};