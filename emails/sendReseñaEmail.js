module.exports = (clienteNombre) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solucitud de reseña</title>
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
            <h1>¡Hola, ${clienteNombre}!</h1>
            <h3>¡Nos encantaría conocer tu opinión sobre tu sesión de fotos!</h3>
            <p>Espero que este correo te encuentre bien. Quería agradecerte nuevamente por haber elegido nuestros servicios para tu sesión de fotos reciente. Fue un verdadero placer trabajar contigo y capturar esos momentos especiales. </p>
            <p>Para nosotros es muy importante conocer tu opinión y saber si la experiencia cumplió con tus expectativas. Si tienes unos minutos disponibles, te agradeceríamos mucho que nos dejaras una breve reseña sobre tu experiencia. Tu feedback no solo nos ayuda a mejorar, sino que también puede guiar a otros clientes potenciales en su decisión. </p>
            <p>Puedes dejar tu reseña haciendo clic en el siguiente enlace:</p>
            <a class="btn" href="http://localhost:5173/createtestimonials">Nueva reseña</a>
            <p>Agradecemos de antemano tu tiempo y comentarios. Si tienes alguna pregunta o necesitas algo más de nuestra parte, no dudes en contactarnos. </p>
            <p>¡Esperamos poder trabajar contigo de nuevo en el futuro! </p>
            <p>Saludos cordiales,</p>
            <img src="https://res.cloudinary.com/digngdp2b/image/upload/v1726859712/firma-rosa_spro3p.png" class="image" />
        </div>
    </div>
</body>
</html>

`