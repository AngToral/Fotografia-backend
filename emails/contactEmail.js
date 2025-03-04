module.exports = (clientName, clientEmail, subject) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New client contact</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #000000;
            color: #333;
            margin: 0;
            padding: 0;
            text-align: center;
        }
        .container {
            width: 90%;
            max-width: 500px;
            margin: 20px auto;
            background-color: #F1F0E8;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .image {
            height: 250px;
        }
        .header {
            display: flex;
            justify-content: center;
        }
        .header img {
            height: 200px;
            margin: auto
        }
        .content {
            text-align: left;
            padding: 0 20px;
        }
        .highlight-box {
            background-color: #2cb9902e;
            border: 3px solid #2cb990;
            border-radius: 10px;
            padding: 15px;
            margin: 20px 0;
        }
        .highlight-text{
            font-size: 16px;
        }
        .highlight-box strong {
            display: block;
            margin-bottom: 10px;
        }
        .btn {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            font-size: 16px;
            color: #fff !important;
            background-color: #96B6C5;
            text-decoration: none;
            border-radius: 5px;
        }
        .container-image {
            display: flex;
            justify-content: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <div class="container-image">
                <img src="https://res.cloudinary.com/digngdp2b/image/upload/v1726859712/firma-rosa_spro3p.png" class="image" />
            </div>
            <h1>Someone wants to talk to you, Mariana! 🔥</h1>
            <h3>Client info:</h3>
            <p><strong>Name: </strong>${clientName}</p>
            <p><strong>Email: </strong>${clientEmail}</p>
            <p><strong>Subject: </strong>${subject}</p>
        </div>
    </div>
</body>
</html>

`