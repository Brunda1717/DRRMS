USE drrms;

-- View 1: See all pending requests with victim details
CREATE VIEW pending_requests_view AS
SELECT 
  rr.request_id,
  v.name AS victim_name,
  v.disaster_area,
  v.family_size,
  v.priority_level AS victim_priority,
  rr.resource_type,
  rr.quantity_needed,
  rr.priority_level AS request_priority,
  rr.status
FROM resource_requests rr
JOIN victims v ON rr.victim_id = v.victim_id
WHERE rr.status = 'pending'
ORDER BY FIELD(rr.priority_level, 'critical', 'high', 'medium', 'low');

-- View 2: See all available donations with donor details
CREATE VIEW available_donations_view AS
SELECT 
  d.donation_id,
  u.name AS donor_name,
  u.email AS donor_email,
  u.location AS donor_location,
  d.resource_type,
  d.quantity,
  d.status,
  d.created_at
FROM donations d
JOIN users u ON d.donor_id = u.user_id
WHERE d.status = 'available';

-- View 3: Complete match details view
CREATE VIEW match_details_view AS
SELECT 
  m.match_id,
  v.name AS victim_name,
  v.disaster_area,
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

-- View 4: NGO dashboard summary
CREATE VIEW ngo_dashboard_view AS
SELECT
  u.name AS ngo_name,
  u.location,
  COUNT(DISTINCT v.victim_id) AS total_victims,
  COUNT(DISTINCT rr.request_id) AS total_requests,
  SUM(CASE WHEN rr.status = 'pending' THEN 1 ELSE 0 END) AS pending_requests,
  SUM(CASE WHEN rr.status = 'matched' THEN 1 ELSE 0 END) AS matched_requests,
  SUM(CASE WHEN rr.status = 'delivered' THEN 1 ELSE 0 END) AS delivered_requests
FROM users u
LEFT JOIN victims v ON u.user_id = v.ngo_id
LEFT JOIN resource_requests rr ON v.victim_id = rr.victim_id
WHERE u.role = 'ngo'
GROUP BY u.user_id, u.name, u.location;