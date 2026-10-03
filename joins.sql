-- SKILL TWO

/*
  in bookings: have two columns that point to differebnt tables.
  facid points to the facilities table.
  memid points to the members table.

  The relationship between members and facililies is many to many as one member can book many facilities and one facility can be booked by many members.
  The junction table is bookings as it connects members and facilities.

  The relationship of the recommendby column in cd.members points back to cd.members itself is one to many as one member can recommend many members.
*/

-- SKILL THREE

-- 1. Retrieve the start times of members' bookings:

SELECT starttime FROM cd.bookings bkgs
JOIN cd.members mbrs
ON mbrs.memid = bkgs.memid
WHERE mbrs.firstname = 'David'
AND mbrs.surname = 'Farrell';

-- 2. Work out the start times of bookings for tennis courts:

SELECT bkgs.starttime, fclts.name
FROM cd.bookings bkgs
JOIN cd.facilities fclts ON fclts.facid = bkgs.facid
WHERE bkgs.starttime >= '2012-09-21'
AND bkgs.starttime < '2012-09-22'
AND fclts.name LIKE 'Tennis%'
ORDER BY bkgs.starttime;

-- 3. Produce a list of all members who have recommended another member:

SELECT DISTINCT recby.firstname, recby.surname
FROM cd.members recby
JOIN cd.members newmbr
ON recby.memid = newmbr.recommendedby
ORDER BY recby.surname, recby.firstname;

-- 4. Produce a list of all members, along with their recommender:

SELECT recby.firstname AS memfname, 
recby.surname AS memsname, 
COALESCE(newmbr.firstname, '') AS recfname, 
COALESCE(newmbr.surname, '') AS recsname
FROM cd.members recby
LEFT JOIN cd.members newmbr
ON recby.recommendedby = newmbr.memid
ORDER BY memsname, memfname;

-- 5. Produce a list of all members who have used a tennis court:

SELECT DISTINCT CONCAT(mbrs.firstname, ' ', mbrs.surname) AS member, fclts.name AS facility
FROM cd.members mbrs
JOIN cd.bookings bkgs ON mbrs.memid = bkgs.memid
JOIN cd.facilities fclts ON fclts.facid = bkgs.facid
WHERE fclts.name LIKE 'Tennis%'
ORDER BY member;

-- 6. Produce a list of costly bookings:

SELECT CONCAT(mbrs.firstname, ' ', mbrs.surname) AS member, fclts.name AS facility,
CASE
WHEN bkgs.memid = 0 THEN fclts.guestcost * bkgs.slots
ELSE fclts.membercost * bkgs.slots
END AS cost
FROM cd.members mbrs
JOIN cd.bookings bkgs ON mbrs.memid = bkgs.memid
JOIN cd.facilities fclts ON fclts.facid = bkgs.facid
WHERE bkgs.starttime >= '2012-09-14'
AND bkgs.starttime < '2012-09-15'
AND (CASE
         WHEN bkgs.memid = 0 THEN fclts.guestcost * bkgs.slots
         ELSE fclts.membercost * bkgs.slots
       END) > 30
ORDER BY cost DESC;

-- 7. Produce a list of all members, along with their recommender, using no joins:

SELECT DISTINCT CONCAT(mbrs.firstname, ' ', mbrs.surname) AS member, 
(SELECT CONCAT(recby.firstname, ' ', recby.surname)
FROM cd.members recby
WHERE recby.memid = mbrs.recommendedby) AS recommender
FROM cd.members mbrs
ORDER BY member, recommender;

-- 8. Produce a list of costly bookings, using a subquery:

-- Couldn't manage to figure out a solution. I looked at the solution afterwards and saw a join. I thought we shouldn't have used joins.