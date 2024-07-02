exports.generateCancellation = (code)=>{
    return `<!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Accommodation Booking Confirmation</title>
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
    
        <style>
            body {
                font-family: 'Lato', sans-serif;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                background-image: url('https://images.trvl-media.com/hotels/1000000/80000/74200/74183/0e56cbe7_z.jpg');
                background-size: cover;
                background-position: center;
                padding: 40px;
                box-sizing: border-box;
                height: auto;
                min-height: 400px;
            }
            .glass-effect {
                background-color: rgba(255, 255, 255, 0.5);
                padding: 40px;
                border-radius: 10px;
                backdrop-filter: blur(10px);
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
                text-align: center;
                height: auto;
                min-height: 300px;
            }
            h1, h2, h3, h4, h5, h6 {
                margin: 0;
                color: #000;
            }
            .footer {
                background-color: #1E1E1E;
                height:100px;
                padding: 20px 0;
                text-align: right;
                color: #fff;
                font-size: 14px;
            }
            .footer h3 {
                font-family: 'Lato', sans-serif;
                font-size: 20px;
                color: #fff;
            }
            .footer p {
                margin: 0;
                text-align: right;
                color: #fff;
                font-size: 14px;
            }
            .footer ul {
                list-style: none;
                padding: 0;
                margin: 0;
                text-align: right;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="glass-effect">
                <h1 style="font-size: 32px;">StayHub</h1>
                <p style="font-size: 22px;">"Travel is the only thing you buy that makes you richer."</p>
                <div style="font-size: 18px;">
                <p><strong>Date From:</strong>${code.from}</p>
                <p><strong>Date To:</strong>${code.to}</p>
                <p><strong>Name of Guest:</strong>${code.name}</p>
                <p><strong>Number of Guests:</strong>${code.noOfGuest}</p>
                <p><strong>Accommodation Name:</strong>${code.AccName}</p>
                    <p style="color: red; font-style: italic; font-weight: bold;">Cancellation Message: Your booking for ${code.AccName} has been Cancelled .</p>
                </div>
            </div>
        </div>
        <div class="footer">
            <table align="right" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 auto;">
                <tr>
                    <td style="text-align: right;">
                        <h3>About</h3>
                        <p>StayHub: Your Hassle-Free Accommodation Source. Simplifying your stay so you can focus on what matters. Welcome to StayHub.</p>
                    </td>
                    <td style="text-align: right;">
                        <h3>Contact Info</h3>
                        <ul>
                            <li>StayHub, Kerala, India</li>
                            <li>Ph: +91 8606340493</li>
                            <li>Mail: yourhostelmate@gmail.com</li>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    </html>
    `
}