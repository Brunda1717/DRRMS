USE drrms;

-- INDEXES
-- Makes search queries faster

-- Index on disaster area (we search by area frequently)
CREATE INDEX idx_disaster_area 
ON victims(disaster_area);

-- Index on resource type (we search by resource frequently)
CREATE INDEX idx_resource_type 
ON donations(resource_type);

-- Index on request status (we filter by status frequently)
CREATE INDEX idx_request_status 
ON resource_requests(status);

-- Index on donation status
CREATE INDEX idx_donation_status 
ON donations(status);

-- Index on priority level
CREATE INDEX idx_priority_level 
ON resource_requests(priority_level);


-- TRANSACTIONS
-- Ensures all steps complete or none complete

-- Transaction 1: Safely create a match
DELIMITER //
CREATE PROCEDURE SafeCreateMatch(
  IN don_id INT, 
  IN req_id INT, 
  IN qty INT
)
BEGIN
  DECLARE available_qty INT;
  DECLARE resource_match INT;
  
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    SELECT 'Transaction failed and rolled back' AS result;
  END;
  
  START TRANSACTION;
  
  -- Check donation has enough quantity
  SELECT quantity INTO available_qty 
  FROM donations 
  WHERE donation_id = don_id AND status = 'available';
  
  -- Check resource types match
  SELECT COUNT(*) INTO resource_match
  FROM donations d
  JOIN resource_requests rr ON d.resource_type = rr.resource_type
  WHERE d.donation_id = don_id AND rr.request_id = req_id;
  
  IF available_qty >= qty AND resource_match > 0 THEN
    -- Create the match
    INSERT INTO matches (donation_id, request_id, matched_quantity, delivery_status)
    VALUES (don_id, req_id, qty, 'pending');
    
    -- Update remaining quantity
    UPDATE donations 
    SET quantity = quantity - qty
    WHERE donation_id = don_id;
    
    COMMIT;
    SELECT 'Match created successfully' AS result;
  ELSE
    ROLLBACK;
    SELECT 'Match failed - quantity insufficient or resource mismatch' AS result;
  END IF;
END //
DELIMITER ;