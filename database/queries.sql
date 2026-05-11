USE drrms;

-- 1. Show all pending requests with victim details (JOIN)
SELECT 
  rr.request_id,
  v.name AS victim_name,
  v.disaster_area,
  rr.resource_type,
  rr.quantity_needed,
  rr.priority_level,
  rr.status
FROM resource_requests rr
JOIN victims v ON rr.victim_id = v.victim_id
WHERE rr.status = 'pending'
ORDER BY 
  FIELD(rr.priority_level, 'critical', 'high', 'medium', 'low');

-- 2. Show all donations with donor details (JOIN)
SELECT 
  d.donation_id,
  u.name AS donor_name,
  u.location AS donor_location,
  d.resource_type,
  d.quantity,
  d.status
FROM donations d
JOIN users u ON d.donor_id = u.user_id
WHERE d.status = 'available';

-- 3. Matching query - find matching donations for pending requests
SELECT 
  rr.request_id,
  v.name AS victim_name,
  v.disaster_area,
  rr.resource_type,
  rr.quantity_needed,
  rr.priority_level,
  d.donation_id,
  u.name AS donor_name,
  d.quantity AS available_quantity
FROM resource_requests rr
JOIN victims v ON rr.victim_id = v.victim_id
JOIN donations d ON rr.resource_type = d.resource_type
JOIN users u ON d.donor_id = u.user_id
WHERE rr.status = 'pending'
AND d.status = 'available'
ORDER BY FIELD(rr.priority_level, 'critical', 'high', 'medium', 'low');

-- 4. Count total donations by resource type
SELECT 
  resource_type,
  COUNT(*) AS total_donations,
  SUM(quantity) AS total_quantity
FROM donations
GROUP BY resource_type
ORDER BY total_quantity DESC;

-- 5. Count pending requests by disaster area
SELECT 
  v.disaster_area,
  COUNT(*) AS total_pending_requests,
  SUM(rr.quantity_needed) AS total_quantity_needed
FROM resource_requests rr
JOIN victims v ON rr.victim_id = v.victim_id
WHERE rr.status = 'pending'
GROUP BY v.disaster_area
ORDER BY total_pending_requests DESC;

-- 6. Show delivery status of all matches
SELECT 
  m.match_id,
  v.name AS victim_name,
  u.name AS donor_name,
  rr.resource_type,
  m.matched_quantity,
  m.delivery_status,
  m.matched_at
FROM matches m
JOIN resource_requests rr ON m.request_id = rr.request_id
JOIN victims v ON rr.victim_id = v.victim_id
JOIN donations d ON m.donation_id = d.donation_id
JOIN users u ON d.donor_id = u.user_id;

-- 7. Most needed resources (useful for dashboard)
SELECT 
  resource_type,
  COUNT(*) AS number_of_requests,
  SUM(quantity_needed) AS total_needed
FROM resource_requests
WHERE status = 'pending'
GROUP BY resource_type
ORDER BY total_needed DESC;

-- 8. Critical victims who still have pending requests
SELECT 
  v.name AS victim_name,
  v.disaster_area,
  v.family_size,
  rr.resource_type,
  rr.quantity_needed
FROM victims v
JOIN resource_requests rr ON v.victim_id = rr.victim_id
WHERE v.priority_level = 'critical'
AND rr.status = 'pending'
ORDER BY v.family_size DESC;