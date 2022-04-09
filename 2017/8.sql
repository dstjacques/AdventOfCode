SET NOCOUNT ON

CREATE TABLE #instructions (
    Id INT IDENTITY(1, 1) PRIMARY KEY,
    JumpOffset INT
)

BULK INSERT #instructions
FROM 'C:\puzzle.csv'
WITH
(
  DATAFILETYPE = 'widechar',
  FIELDTERMINATOR = ',',
  ROWTERMINATOR = '\n',
  ROWS_PER_BATCH = 10000,
  FIRSTROW = 1,
  TABLOCK
)

--SELECT * FROM #instructions

DECLARE @End INT = (SELECT MAX(Id) FROM #instructions)
DECLARE @Current INT = (SELECT MIN(Id) FROM #instructions)
DECLARE @Steps INT = 0
WHILE @Current <= @End
BEGIN
    DECLARE @Previous INT = @Current
    DECLARE @JumpOffset INT = (SELECT JumpOffset FROM #instructions WHERE Id=@Current)
    SET @Current = @Current + @JumpOffset
    UPDATE #instructions SET JumpOffset=JumpOffset+1 WHERE Id=@Previous
    SET @Steps = @Steps + 1
    --PRINT @Current
END
PRINT 'The exit is reached in ' + LTRIM(STR(@Steps)) + ' steps'

DROP TABLE #instructions

--- part 2

SET NOCOUNT ON

CREATE TABLE #instructions (
    Id INT IDENTITY(1, 1) PRIMARY KEY,
    JumpOffset INT
)

BULK INSERT #instructions
FROM 'C:\puzzle.csv'
WITH
(
  DATAFILETYPE = 'widechar',
  FIELDTERMINATOR = ',',
  ROWTERMINATOR = '\n',
  ROWS_PER_BATCH = 10000,
  FIRSTROW = 1,
  TABLOCK
)

--SELECT * FROM #instructions

DECLARE @End INT = (SELECT MAX(Id) FROM #instructions)
DECLARE @Current INT = (SELECT MIN(Id) FROM #instructions)
DECLARE @Steps INT = 0
WHILE @Current <= @End
BEGIN
    DECLARE @Previous INT = @Current
    DECLARE @JumpOffset INT = (SELECT JumpOffset FROM #instructions WHERE Id=@Current)
    SET @Current = @Current + @JumpOffset

    DECLARE @Increment INT = 1
    IF @JumpOffset >= 3
    BEGIN
        SET @Increment = -1
    END
    UPDATE #instructions SET JumpOffset=JumpOffset+@Increment WHERE Id=@Previous
    SET @Steps = @Steps + 1
    --PRINT @Current
END
PRINT 'The exit is reached in ' + LTRIM(STR(@Steps)) + ' steps'

DROP TABLE #instructions