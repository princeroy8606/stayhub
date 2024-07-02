exports.generateEmailTemplate = (code) => {
  return ` 
    <!DOCTYPE html>
    heloo
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #f1f1f1; margin: 0 auto; padding: 0; height: 100%; width: 100%;">
    <head>
        <meta charset="utf-8"> <!-- utf-8 works for most cases -->
        <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
        <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
        <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->
    
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
    
        <!-- CSS Reset : BEGIN -->
        <style>
    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
      u ~ div .email-container {
        min-width: 320px !important;
      }
    }
    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
      u ~ div .email-container {
        min-width: 375px !important;
      }
    }
    @media only screen and (min-device-width: 414px) {
      u ~ div .email-container {
        min-width: 414px !important;
      }
    }
    </style>
    
        <!-- CSS Reset : END -->
    
        <!-- Progressive Enhancements : BEGIN -->
        <style>
    @media screen and (max-width: 500px) {}
    </style>
    
    
    </head>
    
    <body width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;font-family: 'Lato', sans-serif; font-weight: 400; font-size: 15px; line-height: 1.8; color: rgba(0,0,0,.4); mso-line-height-rule: exactly; background-color: #B1A7A6; margin:0; height: 100%; width: 100%; padding: 10px;">
        <center style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100%; background-color:#c3d23d;">
        <div style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: none; font-size: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
          &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        </div>
        <div style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width: 600px; margin: 0 auto;" class="email-container">
            <!-- BEGIN BODY -->
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;background-color ">
              <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
              <td valign="top" class="bg_white" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background:#1E1E1E; padding: 1em 2.5em 0 2.5em; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                      <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                          <td class="logo" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-align: center; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" align="center">
                            <h1 style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Lato', sans-serif; color: #000000; margin-top: 0; font-weight: 400; margin: 0;"><a href="#" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; color:#c3d23d; font-size: 54px; font-weight: 800;font-family: 'Dancing Script'">StayHub</a></h1>
                          </td>
                      </tr>
                  </table>
              </td>
              </tr><!-- end tr -->
              <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
              <td valign="middle" class="hero bg_white" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;background-color:#1E1E1E; position: relative; z-index: 0; padding: 3em 0 2em 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <img src="images/email.png" alt="" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; -ms-interpolation-mode: bicubic; width: 300px; max-width: 600px; height: auto; margin: auto; display: block;" width="300">
              </td>
              </tr><!-- end tr -->
                    <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
              <td valign="middle" class="hero bg_white" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color:#1E1E1E; position: relative; z-index: 0; padding: 2em 0 4em 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <table style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                    <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                        <td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <div class="text" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: rgba(0,0,0,.3); padding: 0 2.5em; text-align: center;">
                                <h2 style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Lato', sans-serif; margin-top: 0; color:white; font-size: 40px; margin-bottom: 0; font-weight: 400; line-height: 1.4;">Please verify your email</h2><br/>
                                <h5 style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Dancing Script', cursive; color: #D9D9D9; margin-top: 0; font-size: 18px; font-weight: 200;">" Home Away from Home - Where Comfort and Convenience Converge. Our goal is to offer a hassle-free experience for travelers, so you can concentrate on what truly matters - Your Journey. "</h5>
                                <p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><p class="btn btn-primary" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; padding: 15px 15px; display: inline-block; border-radius: 5px; background: #B1A7A6; color:black;font-weight: 800;width:30%;letter-spacing:8px">${code}</p></p>
                            </div>
                        </td>
                    </tr>
                </table>
              </td>
              </tr><!-- end tr -->
          <!-- 1 Column Text + Button : END -->
          </table>
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
              <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
              <td valign="middle" class="bg_light footer email-section" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #fafafa; padding: 2.5em; border-top: 1px solid rgba(0,0,0,.05); color: rgba(0,0,0,.5); mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <table style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                    <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <td valign="top" width="33.333%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 20px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                        <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                          <td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-align: left; padding-right: 10px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" align="left">
                              <h3 class="heading" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Lato', sans-serif; margin-top: 0; font-weight: 400; color: #000; font-size: 20px;">About</h3>
                              <p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;font-size: 14px; "> StayHub: Your Hassle-Free Accommodation Source. Simplifying your stay so you can focus on what matters. Welcome to StayHub..</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="30.333%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 20px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                        <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                          <td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-align: left; padding-left: 5px; padding-right: 5px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" align="left">
                              <h3 class="heading" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Lato', sans-serif; margin-top: 0; font-weight: 400; color: #000; font-size: 20px;">Contact Info</h3>
                              <ul style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; margin: 0; padding: 0;">
                                        <li style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; list-style: none; margin-bottom: 10px;"><span class="text" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">StayHub, kerala ,India</span></li>
                                        <li style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; list-style: none; margin-bottom: 10px;"><span class="text" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">Ph:+91 8606340493</span></li>
                                         <li style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; list-style: none; margin-bottom: 10px;"><span class="text" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">Mail:yourhostelmate@gmail.com</span></li>
                                      </ul>
                          </td>
                        </tr>
                      </table>
                    </td>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
          </table>
        </div>
      </center>
    </body>
    </html>
    `;
};
