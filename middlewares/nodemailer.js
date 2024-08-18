import nodemailer from 'nodemailer'
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
 import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir=path.resolve(__dirname,'..');

dotenv.config()


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSKEY,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export const welcomeMail = async (req,res,next) => {
    try{


       const {email,username}=req.userData;
       console.log(username,email)

       newUserMail(username,email)
     
      
        
     

}catch(error){
    console.log(error)
}
}






export async function newUserMail(username,email) {
    const imagePath = path.join(publicDir, 'public', 'assets', '1719122277947-1000_front (1).png');
    const injectHTML= `
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <title>
      </title>
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
        #outlook a {
          padding: 0;
        }
    
        body {
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
    
        table,
        td {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
    
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }
    
        p {
          display: block;
          margin: 13px 0;
        }
      </style>
      <!--[if mso]>
            <noscript>
            <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            </noscript>
            <![endif]-->
      <!--[if lte mso 11]>
            <style type="text/css">
              .mj-outlook-group-fix { width:100% !important; }
            </style>
            <![endif]-->
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700" rel="stylesheet" type="text/css">
      <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700);
      </style>
      <!--<![endif]-->
      <style type="text/css">
        @media only screen and (min-width:480px) {
          .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
          }
        }
      </style>
      <style media="screen and (min-width:480px)">
        .moz-text-html .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
      </style>
      <style type="text/css">
        @media only screen and (max-width:480px) {
          table.mj-full-width-mobile {
            width: 100% !important;
          }
    
          td.mj-full-width-mobile {
            width: auto !important;
          }
        }
      </style>
    </head>
    
    <body style="word-spacing:normal;background-color:#ffffff;">
      <div style="background-color:#ffffff;">
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                      <tbody>
                        <tr>
                          <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                              <tbody>
                                <tr>
                                  <td style="width:600px;">
                                    <img alt="" height="auto" src="http://go.mailjet.com/tplimg/mtrq/b/ox8s/mg1rw.png" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="600" />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#009FE3" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#009FE3;background-color:#009FE3;margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#009FE3;background-color:#009FE3;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                      <tbody>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;padding-top:50px;padding-right:25px;padding-bottom:30px;padding-left:15px;word-break:break-word;">
                            <div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:45px;font-weight:bold;line-height:1;text-align:left;color:#ffffff;">Welcome to infovit</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#009fe3" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#009fe3;background-color:#009fe3;margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#009fe3;background-color:#009fe3;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:middle;width:600px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%">
                      <tbody>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;">
                            <div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:22px;line-height:1;text-align:left;color:#ffffff;"><span style="color:#FEEB35">Dear ${username}</span><br /><br /> Welcome to infovit</div>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;">
                            <div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:15px;line-height:1;text-align:left;color:#ffffff;">We&apos;re really excited you&apos;ve decided to give us a try. In case you have any questions, feel free to reach out to us at infovit24@gmail.com. You can login to your account with your username ${username}</div>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                              <tr>
                                <td align="center" bgcolor="#ffffff" role="presentation" style="border:none;border-radius:10px;cursor:auto;mso-padding-alt:10px 25px;background:#ffffff;" valign="middle">
                                  <a href='https://www.infovit.us/createAccount'><p style="display:inline-block;cursor:pointer;background:#ffffff;color:#1AA0E1;font-family:open Sans Helvetica, Arial, sans-serif;font-size:22px;font-weight:bold;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:10px;"> Login</p></a> 
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;">
                            <div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:15px;line-height:1;text-align:left;color:#ffffff;">Thanks, <br /> The Infovit Team</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
      </div>
    </body>
    
    </html>
    `;
    
      // send mail with defined transport object

      try{

      
      const info = await transporter.sendMail({
        from: '"Infovit" <danigondal117@gmail.com>', // sender address
        to: email, // list of receivers
        html: injectHTML, // html body
        subject:'Welcome to infovit',
        attachments: [
            {
              filename: 'logo', // Replace with your image file name
              path: imagePath, // Replace with the actual path to your image file
              cid: 'unique_image_cid', // Content-ID for referencing in the HTML content
            },
          ],
      });
    
      console.log("Message sent: %s", info.messageId);
    }catch(error){
        console.log(error)
    }
    
}










 export const sendAdminOTPMail=async(email,otp,username)=>{
    try{  
const injectHTML= 
`<p>Hello ${username}</p>
<p><strong>${otp}</strong> is your One-Time Password (OTP) to proceed with the Infovit Admin Panel Access, to be used within 10 minutes. Please do not share your OTP with anyone.</p>

`;

const info = await transporter.sendMail({
    from: '"Infovit" <danigondal117@gmail.com>', // sender address
    to: email.join(','), // list of receivers
    html: injectHTML, // html body
    subject:'Infovit Admin Access' 
                                        });
    


console.log("Message sent: %s", info.messageId);

}catch(error){
    console.log(error);
}

  }
 
 





































 
  
  // Function to send password recovery email
  export const sendPasswordRecoveryEmail = async (email, resetToken) => {
    // Define the recovery link (replace with your actual URL and token)
    const recoveryLink = `http://localhost:3000/account-security/reset-password/${resetToken}`;
  
    // Define the email content
    const mailOptions = {
      from: '"Infovit" <danigondal117@gmail.com>', // Sender address
      to: email, // Recipient address
      subject: 'Password Recovery Request', // Subject line
      html: `
        <p>Dear User,</p>
        <p>We received a request to reset your password. Click the link below to reset your password:</p>
        <p><a href="${recoveryLink}">Reset your password.</a></p>
        <p>This link is only valid for 4 hours.</a></p>
        <p>If you did not request this change, please ignore this email.</p>
        <p>Regards,<br>Infovit Team</p>
      `, // HTML body
    };
  
    try {
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Password recovery email sent:', info.response);
    } catch (error) {
      console.error('Error sending password recovery email:', error);
    }
  };
  






























  export async function orderCreatedMail(username,email,orderNumber,orderDate,orderTotalAmount) {
    
    const injectHTML= `
   <!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title>
  </title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if mso]>
        <noscript>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        </noscript>
        <![endif]-->
  <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }

      .mj-column-per-33-333333333333336 {
        width: 33.333333333333336% !important;
        max-width: 33.333333333333336%;
      }

      .mj-column-per-50 {
        width: 50% !important;
        max-width: 50%;
      }
    }
  </style>
  <style media="screen and (min-width:480px)">
    .moz-text-html .mj-column-per-100 {
      width: 100% !important;
      max-width: 100%;
    }

    .moz-text-html .mj-column-per-33-333333333333336 {
      width: 33.333333333333336% !important;
      max-width: 33.333333333333336%;
    }

    .moz-text-html .mj-column-per-50 {
      width: 50% !important;
      max-width: 50%;
    }
  </style>
  <style type="text/css">
  </style>
</head>

<body style="word-spacing:normal;background-color:#ccd3e0;">
  <div style="background-color:#ccd3e0;">
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#356cc7" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#356cc7;background-color:#356cc7;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#356cc7;background-color:#356cc7;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;padding-top:28px;padding-right:25px;padding-bottom:18px;padding-left:25px;word-break:break-word;">
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#ABCDEA;">HELLO <p style="font-size:16px; color:white">${username}</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#356cc7" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#356cc7;background-color:#356cc7;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#356cc7;background-color:#356cc7;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:5px;padding-top:0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0;padding-right:20px;padding-bottom:0px;padding-left:20px;word-break:break-word;">
                        <p style="border-top:solid 2px #ffffff;font-size:1px;margin:0px auto;width:100%;">
                        </p>
                        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 2px #ffffff;font-size:1px;margin:0px auto;width:560px;" role="presentation" width="560px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]-->
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;padding-top:28px;padding-right:25px;padding-bottom:28px;padding-left:25px;word-break:break-word;">
                        <div style="font-family:Helvetica;font-size:13px;line-height:1;text-align:center;color:#FFFFFF;"><span style="font-size:20px; font-weight:bold">Thank you very much for your purchase.</span>
                          <br />
                          <span style="font-size:15px">Please find the receipt below.</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#568feb" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#568feb;background-color:#568feb;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#568feb;background-color:#568feb;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:15px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:200px;" ><![endif]-->
              <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-bottom:0px;padding-left:25px;word-break:break-word;">
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;line-height:1;text-align:center;color:#FFFFFF;"><strong>Order Number</strong></div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;padding-top:10px;padding-right:25px;padding-bottom:20px;padding-left:25px;word-break:break-word;">
                        <div style="font-family:Helvetica;font-size:13px;line-height:1;text-align:center;color:#FFFFFF;">${orderNumber}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:200px;" ><![endif]-->
              <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-bottom:0px;padding-left:25px;word-break:break-word;">
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;line-height:1;text-align:center;color:#FFFFFF;"><strong>Order Date</strong></div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;padding-top:10px;padding-right:25px;padding-bottom:20px;padding-left:25px;word-break:break-word;">
                        <div style="font-family:Helvetica;font-size:13px;line-height:1;text-align:center;color:#FFFFFF;">${orderDate}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:200px;" ><![endif]-->
              <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-bottom:0px;padding-left:25px;word-break:break-word;">
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;line-height:1;text-align:center;color:#FFFFFF;"><strong>Total Price</strong></div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;padding-top:10px;padding-right:25px;padding-bottom:20px;padding-left:25px;word-break:break-word;">
                        <div style="font-family:Helvetica;font-size:13px;line-height:1;text-align:center;color:#FFFFFF;">&#36;${orderTotalAmount}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#356CC7" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#356CC7;background-color:#356CC7;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#356CC7;background-color:#356CC7;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:300px;" ><![endif]-->
              <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" vertical-align="middle" style="font-size:0px;padding:15px 30px;padding-right:25px;padding-bottom:10px;padding-left:25px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                          <tr>
                            <td align="center" bgcolor="#ffae00" role="presentation" style="border:none;border-radius:10px;cursor:auto;mso-padding-alt:10px 25px;background:#ffae00;" valign="middle">
                              <a href="" style="display:inline-block;background:#ffae00;color:#FFFFFF;font-family:Helvetica;font-size:14px;font-weight:bold;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:10px;" target="_blank"> Download Receipt </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:300px;" ><![endif]-->
              <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" vertical-align="middle" style="font-size:0px;padding:15px 30px;padding-right:25px;padding-bottom:12px;padding-left:25px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                          <tr>
                            <td align="center" bgcolor="#ffae00" role="presentation" style="border:none;border-radius:10px;cursor:auto;mso-padding-alt:10px 25px;background:#ffae00;" valign="middle">
                              <a href="https://www.infovit.us/userOrders" style="display:inline-block;background:#ffae00;color:#FFFFFF;font-family:Helvetica;font-size:14px;font-weight:bold;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:10px;" target="_blank"> Track My Order </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#356cc7" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#356cc7;background-color:#356cc7;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#356cc7;background-color:#356cc7;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:5px;padding-top:0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0;padding-right:20px;padding-bottom:0px;padding-left:20px;word-break:break-word;">
                        <p style="border-top:solid 2px #ffffff;font-size:1px;margin:0px auto;width:100%;">
                        </p>
                        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 2px #ffffff;font-size:1px;margin:0px auto;width:560px;" role="presentation" width="560px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]-->
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;padding-top:20px;padding-right:25px;padding-bottom:20px;padding-left:25px;word-break:break-word;">
                        <div style="font-family:Helvetica;font-size:15px;line-height:1;text-align:center;color:#FFFFFF;">Best, <br />
                          <span style="font-size:15px;color:white">infovit24@gmail.com,</span>
                          <br />
                          <span style="font-size:15px">The Infovit Team</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
  </div>
</body>

</html>







    `;
    
      // send mail with defined transport object

      try{

      
      const info = await transporter.sendMail({
        from: '"Infovit" <danigondal117@gmail.com>', // sender address
        to: email, // list of receivers
        html: injectHTML, // html body
        subject:'Order Successfull'
      });
    
      console.log("Message sent: %s", info.messageId);
    }catch(error){
        console.log(error)
    }
    
}










































export const passwordMail=async(req,res,next)=>{
  try{

  const {email}=req.body

  const token= jwt.sign({email:email},process.env.JWT_SECRET)










         
      
const injectHTML= `
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
      *{
          padding: 0;
          margin:0;
      }

      .title {
          display: flex;
          flex-direction: row;
          justify-content: center;
      }
      .title h1{
          margin: 1%;
      }

      h2{
          margin-top: 5%;
          margin-bottom: 1%;
          text-align: center;
          font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      }

      h2 span{
          font-size: clamp(1rem,1.5rem,5rem);
          color: #00D5FA;
          font-weight: bold;
      }

      p{  
          font-size: 1.3rem;
          text-align: center;
      }

     .title img{
          width: 5%;
          height: 10vh;
          border-radius: 100%;
      }
  </style>
 
</head>
<body>
  <div>
      <div class="title">
      
  <h1> HELLO User </h1>
</div>
  <h2>WE WELCOME YOU TO <span>SOCIOPEDIA </span></h2>
  <p> Please visit this <a href='http://localhost:3000/forget_password/${token}'> link  </a> for recovering your Password </p>
   

  

 </div>



  
</body>
</html>
`;

const info = await transporter.sendMail({
  from: '"SOCIOPEDIA" <danigondal117@gmail.com>', // sender address
  to: email, // list of receivers
  html: injectHTML, // html body
  subject:'Password Recovery' 
                                      });
  


console.log("Message sent: %s", info.messageId);
next()
}catch(error){
  console.log(error);
}

}





export const ThankYouMail=async(name,email)=>{


const injectHTML = `
    <html>
    <body>
      <h1>Thank You for Contacting Us</h1>
      <p>Hi ${name},</p>
      <p>Thank you for reaching out to us. We have received your message and our team is reviewing it. We will get back to you as soon as possible.</p>
      <p>Best regards,<br>Infovit Team</p>
    </body>
    </html>
  `;


  const info = await transporter.sendMail({
    from: '"SOCIOPEDIA" <danigondal117@gmail.com>', // sender address
    to: email, // list of receivers
    html: injectHTML, // html body
    subject:'Thankyou for contacting us' 
                                        });
    
  
  
  console.log("Message sent: %s", info.messageId);





}
















