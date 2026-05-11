USE drrms;

-- Trigger 1: When a match is created, 
-- automatically update donation status to 'assigned'
DELIMITER //
CREATE TRIGGER after_match_insert
AFTER INSERT ON matches
FOR EACH ROW
BEGIN
  UPDATE donations 
  SET status = 'assigned'
  WHERE donation_id = NEW.donation_id;
  
  UPDATE resource_requests
  SET status = 'matched'
  WHERE request_id = NEW.request_id;
END //
DELIMITER ;

-- Trigger 2: When delivery status becomes 'delivered',
-- automatically update request status to 'delivered'
DELIMITER //
CREATE TRIGGER after_match_update
AFTER UPDATE ON matches
FOR EACH ROW
BEGIN
  IF NEW.delivery_status = 'delivered' THEN
    UPDATE resource_requests
    SET status = 'delivered'
    WHERE request_id = NEW.request_id;
    
    UPDATE donations
    SET status = 'delivered'
    WHERE donation_id = NEW.donation_id;
  END IF;
END //
DELIMITER ;

-- Trigger 3: Prevent inserting a match 
-- if donation quantity is less than requested quantity
DELIMITER //
CREATE TRIGGER before_match_insert
BEFORE INSERT ON matches
FOR EACH ROW
BEGIN
  DECLARE available_qty INT;
  DECLARE needed_qty INT;
  
  SELECT quantity INTO available_qty 
  FROM donations 
  WHERE donation_id = NEW.donation_id;
  
  SELECT quantity_needed INTO needed_qty 
  FROM resource_requests 
  WHERE request_id = NEW.request_id;
  
  IF NEW.matched_quantity > available_qty THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Error: Matched quantity exceeds available donation quantity';
  END IF;
END //
DELIMITER ;