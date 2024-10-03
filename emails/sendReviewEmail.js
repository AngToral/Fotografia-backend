module.exports = (clientName) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Revview request</title>
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
            <h1>Dear ${clientName}!</h1>
            <h3>We’d love to hear your thoughts on your recent photo session!</h3>
            <p>I hope this email finds you well. I wanted to thank you again for choosing our services for your recent photo session. It was truly a pleasure working with you and capturing those special moments.</p>
            <p>We highly value your feedback and would love to know if the experience met your expectations. If you have a few minutes, we would greatly appreciate it if you could leave a short review of your experience. Your feedback not only helps us improve but also assists other potential clients in making their decisions.</p>
            <p>You can leave your review by clicking the following link:</p>
            <a class="btn" href="http://localhost:5173/createtestimonials">New review</a>
            <p>Thank you in advance for your time and comments. If you have any questions or need anything else from us, please don’t hesitate to reach out.</p>
            <p>We look forward to working with you again in the future!</p>
            <p>Best regards,</p>
            <img src="https://res.cloudinary.com/digngdp2b/image/upload/v1726859712/firma-rosa_spro3p.png" class="image" />
        </div>
    </div>
</body>
</html>

`

