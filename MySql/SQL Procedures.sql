-- Procedure for user signup check
drop procedure  if exists existingEmail;
DELIMITER $$
CREATE PROCEDURE `existingEmail` (IN _EmailID varchar(60))
BEGIN
declare exit handler for sqlexception rollback;
start transaction;
SELECT * FROM SIGNUP 
WHERE UserName =  _EmailID;
commit;
END$$
DELIMITER ;

-- Procedure to insert users in the SIGNUP table
drop procedure  if exists userInsert;
DELIMITER $$
CREATE PROCEDURE `userInsert` (IN _UserName varchar(60), IN _Password varchar(150) , IN _Role enum('student','company','admin'))
BEGIN
declare exit handler for sqlexception rollback;
start transaction;
INSERT INTO SIGNUP (UserName, Password, Role) 
VALUES (_UserName,_Password, _Role);
SELECT LAST_INSERT_ID() AS ID;
commit;
END$$
DELIMITER ;

-- Procedure to submit job application
drop procedure  if exists applicationSubmit;
DELIMITER $$
CREATE PROCEDURE `applicationSubmit` (IN _JobID bigint, IN _StudentID bigint , IN _StudentName varchar(45),
IN _ResumeURL varchar(150), _CoverLetterURL varchar(150),
IN _Ethnicity enum('Indigenous American or Alaska Native','East Asian','South Asian','Southeast Asian','Native Hawaiian or Other Pacific Islander','Middle Eastern','Black or African American','Hispanic or Latinx','White','Prefer to Self Describe','Prefer Not to Say'),
IN _Gender enum('Male', 'Female', 'Prefer not to share'),
IN _Disability enum('Yes', 'No', 'Prefer Not to Say'),
IN _VeteranStatus enum('Yes', 'No', 'Prefer Not to Say'),
_Status enum('Submitted','Reviewed','Initial Screening','Interviewing','Hired','Rejected'))
BEGIN
declare exit handler for sqlexception rollback;
start transaction;
INSERT INTO APPLICATION_RECEIVED (JobID, StudentID, StudentName, ResumeURL, CoverLetterURL, Status, Withdrawn, Ethnicity, Gender, Disability, VeteranStatus) 
VALUES (_JobID, _StudentID, _StudentName, _ResumeURL, _CoverLetterURL, _Status, 0, _Ethnicity, _Gender, _Disability, _VeteranStatus );
commit;
END$$
DELIMITER ;

-- Procedure to add jobs in the APPILCATION_JOB table
drop procedure  if exists jobInsert;
DELIMITER $$
CREATE PROCEDURE `jobInsert` (IN _ID bigint, IN _CompanyName varchar(60), IN _CompanyID bigint , IN _PostedDate date,IN _StreetAddress varchar(45),IN _City varchar(45),IN _State varchar(45))
BEGIN
declare exit handler for sqlexception rollback;
start transaction;
INSERT INTO APPLICATION_JOB (JobID,CompanyName, CompanyID, PostedDate,StreetAddress,City,State) 
VALUES (_ID,_CompanyName,_CompanyID, _PostedDate,_StreetAddress,_City,_State);
commit;
END$$
DELIMITER ;

drop procedure  if exists fetchReview;
DELIMITER $$
CREATE PROCEDURE `fetchReview` (IN _ID bigint)
BEGIN
declare exit handler for sqlexception rollback;
start transaction;
SELECT * FROM GENERAL_REVIEW 
WHERE CompanyID =  _ID AND Status='Approved';
commit;
END$$
DELIMITER ;

-- Procedure for withdrawing application
drop procedure  if exists applicationWithDraw;
DELIMITER $$
CREATE PROCEDURE `applicationWithDraw` (IN _JobID bigint, IN _StudentID bigint)
BEGIN
declare exit handler for sqlexception rollback;
start transaction;
UPDATE APPLICATION_RECEIVED
SET Withdrawn = 1
WHERE JobID = _JobID AND StudentID =_StudentID;
commit;
END$$
DELIMITER ;

-- Procedure to add jobs in the GENERAL_REVIEW table
drop procedure  if exists reviewInsert;
DELIMITER $$
CREATE PROCEDURE `reviewInsert` (IN _CompanyID bigint,IN _StudentID bigint,IN _CompanyName varchar(60), IN _Pros varchar(150), IN _Cons varchar(150),IN _Descriptions varchar(300),IN _Rating int, IN _EmployeeStatus enum('Current','Former'),IN _Status enum('NotApproved','Approved','Disapproved'),IN _Helpful bigint,IN _CEOApproval tinyint,IN _JobType enum('FullTime','PartTime','Contract','Intern','Freelance'),IN _Recommended tinyint, IN _JobTitle varchar(45), IN _Headline varchar(80),IN _DatePosted date, IN _Response varchar(300), In _Favorite tinyint )
BEGIN
declare exit handler for sqlexception rollback;
start transaction;
INSERT INTO GENERAL_REVIEW (CompanyID, StudentID, CompanyName,Pros,Cons,Descriptions,Rating,EmployeeStatus,Status,Helpful,CEOApproval,JobType,Recommended,JobTitle,Headline,DatePosted,Response,Favorite)
VALUES (_CompanyID, _StudentID, _CompanyName,_Pros,_Cons,_Descriptions,_Rating,_EmployeeStatus,_Status,_Helpful,_CEOApproval,_JobType,_Recommended,_JobTitle,_Headline,_DatePosted,_Response,_Favorite);
SELECT LAST_INSERT_ID() AS ID;
commit;
END$$
DELIMITER ;

-- Procedure to add jobs in the INTERVIEW_REVIEW table
drop procedure  if exists interviewReviewInsert;
DELIMITER $$
CREATE PROCEDURE `interviewReviewInsert` (IN _CompanyID bigint,IN _StudentID bigint,IN _CompanyName varchar(60),IN _Status enum('Not Approved','Approved','Disapproved'),IN _Helpful bigint, IN _DatePosted date, IN _OverallExperience enum('Positive', 'Negative', 'Neutral'), IN _JobTitle varchar(50), IN _Description varchar(350), IN _Difficulty int, IN _OfferStatus enum('No', 'Yes, but I declined','Yes, and I accepted'), IN _InterviewQuestions varchar(350), In _Answers varchar(400))
BEGIN
declare exit handler for sqlexception rollback;
start transaction;
INSERT INTO INTERVIEW_REVIEW (CompanyID, StudentID,CompanyName, Status,Helpful,DatePosted,OverallExperience,JobTitle,Description,Difficulty,OfferStatus,InterviewQuestions,Answers)
VALUES (_CompanyID, _StudentID,_CompanyName, _Status,_Helpful,_DatePosted,_OverallExperience,_JobTitle,_Description,_Difficulty,_OfferStatus,_InterviewQuestions,_Answers);
SELECT LAST_INSERT_ID() AS InterviewReviewID;
commit;
END$$
DELIMITER ;

-- Procedure to add jobs in the SALARY_REVIEW table
drop procedure  if exists salaryReviewInsert;
DELIMITER $$
CREATE PROCEDURE `salaryReviewInsert` (IN _CompanyID bigint,IN _StudentID bigint,IN _Status enum('Not Approved','Approved','Disapproved'),IN _DatePosted date, IN _BaseSalary bigint,IN _Bonuses bigint, IN _JobTitle varchar(50),IN _Years int, In _StreetAddress varchar(45), IN _City varchar(45), IN _State varchar(45), IN _Zip int)
BEGIN
declare exit handler for sqlexception rollback;
start transaction;
INSERT INTO SALARY_REVIEW (CompanyID, StudentID, Status,DatePosted,BaseSalary,Bonuses,JobTitle,Years,StreetAddress,City,State,Zip)
VALUES (_CompanyID, _StudentID, _Status,_DatePosted,_BaseSalary,_Bonuses,_JobTitle,_Years,_StreetAddress,_City,_State,_Zip);
SELECT LAST_INSERT_ID() AS SalaryReviewID;
commit;
END$$
DELIMITER ;

-- Procedure for get job spplications
drop procedure  if exists getApplications;
DELIMITER $$
CREATE PROCEDURE `getApplications` (IN _JobID bigint, IN _limit int, IN _offset int)
BEGIN
declare exit handler for sqlexception rollback;
start transaction;
SELECT JobID, StudentID, StudentName, ResumeURL, CoverLetterURL, Status 
FROM APPLICATION_RECEIVED 
WHERE Withdrawn = 0 AND JObID = _JobID
LIMIT _limit OFFSET _offset;

SELECT COUNT(*) As TotalCount
FROM APPLICATION_RECEIVED 
WHERE Withdrawn = 0 AND JObID = _JobID;
commit;
END$$
DELIMITER ;

-- Procedure to update the application status
drop procedure  if exists updateApplicationsStatus;
DELIMITER $$
CREATE PROCEDURE `updateApplicationsStatus` (IN _JobID bigint, IN _StudentID bigint, IN _Status varchar(30))
BEGIN
declare exit handler for sqlexception rollback;
start transaction;
UPDATE APPLICATION_RECEIVED SET Status = _Status
WHERE JobID = _JobID AND  StudentID = _StudentID;
commit;
END$$
DELIMITER ;

