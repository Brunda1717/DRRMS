USE drrms;

-- Procedure 1: Get all pending requests by disaster area
DELIMITER //
CREATE PROCEDURE GetPendingRequestsByArea(IN area VARCHAR(100))
BEGIN
  SELECT 
    v.name AS victim_name,
    v.family_size,
    rr.resource_type,
    rr.quantity_needed,
    rr.priority_level
  FROM resource_requests rr
  JOIN victims v ON rr.victim_id = v.victim_id
  WHERE v.disaster_area = area
  AND rr.status = 'pending'
  ORDER BY FIELD(rr.priority_level, 'critical', 'high', 'medium', 'low');
END //
DELIMITER ;

-- Procedure 2: Get all available donations by resource type
DELIMITER //
CREATE PROCEDURE GetDonationsByResource(IN resource VARCHAR(100))
BEGIN
  SELECT 
    u.name AS donor_name,
    u.location,
    d.quantity,
    d.status
  FROM donations d
  JOIN users u ON d.donor_id = u.user_id
  WHERE d.resource_type = resource
  AND d.status = 'available';
END //
DELIMITER ;

-- Procedure 3: Auto match donation to request
DELIMITER //
CREATE PROCEDURE AutoMatch(IN req_id INT, IN don_id INT, IN qty INT)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    SELECT 'Error occurred - match rolled back' AS message;
  END;
  
  START TRANSACTION;
  
  INSERT INTO matches (donation_id, request_id, matched_quantity, delivery_status)
  VALUES (don_id, req_id, qty, 'pending');
  
  COMMIT;
  SELECT 'Match created successfully' AS message;
END //
DELIMITER ;