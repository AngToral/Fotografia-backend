module.exports = `

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido a BudgetWise</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
            text-align: center;
        }
        .container {
            width: 90%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header img {
            height: 50px;
            margin: auto
        }
        .header {
            display: flex;
            justify-content: center;
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
            background-color: #2cb990;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://tfm-amarillo-frontend.netlify.app/BudgetWiseNS.png" alt="BudgetWise Logo">
        </div>
        <div class="content">
            <h1>¡Gracias por registrarte en BudgetWise!</h1>
            <p>Estamos encantados de darte la bienvenida a nuestra aplicación. BudgetWise es la herramienta perfecta para gestionar tus finanzas de manera eficiente y sencilla. Con BudgetWise, podrás:</p>
            <ul>
                <li>Controlar tus gastos e ingresos</li>
                <li>Analizar tu historial financiero con gráficos y reportes detallados</li>
            </ul>
            <div class="highlight-box">
                <p class="highlight-text"><strong>Para iniciar sesión, utiliza los siguientes datos:</strong></p>
                <p><strong>Usuario:</strong> Prueba </p>
                <p><strong>Contraseña:</strong>Hola</p>
            </div>
            <p><strong>Haz click aquí para activar tu cuenta:</strong></p>
            <a class="btn" href="">¡Activar Cuenta!</a>

            <p>No olvides acceder a tu perfil y cambiar tu contraseña por una más segura.</p>
        </div>
    </div>
</body>
</html>

`