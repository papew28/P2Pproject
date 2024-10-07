<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Welcome to this amazing web application</title>
<style>
    .center {
        text-align: center;
    }
</style>
</head>
<body>
    <div class="center"><h1>Tenter votre chance à cette loterie virtuelle!</h1></div>
    <form action="./Hello" method="post">
        Votre nom svp: <input type="text" name="nom"><br>
        <br>
        <div class="center"><input type="submit" value="Submit"></div>
    </form>
</body>
</html>
