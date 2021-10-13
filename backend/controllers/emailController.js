
import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'
// @desc    email
// @route   POST /api/ 
// @access  Private/Admin
const sendEmail = asyncHandler(async (req, res) => {
  const data = req.body 

  const smtpTransport = nodemailer.createTransport({
    
    service:'Gmail',
    port:465,
    auth:{
        user:'amine.baya11@gmail.com', 
        pass:'mehdibaya'
    },
    tls:{
        rejectUnauthorized:false
    }
  })

  const mailOptions={
      from: data.email,
      to: 'amine.baya11@gmail.com',
      subject: `Message from ${data.name}`,
      html:`
      
      <h3> Informations  </h3>
      <ul>
            <li>Nom: ${data.name}</li>
            <li>Prénom: ${data.lastname}</li>
            <li>Email:  ${data.email}</li>
      </ul>

      <h3>Message</h3>

      <p> ${data.message} </p>
  
      `
  }

smtpTransport.sendMail(mailOptions,(error,response)=>{

if (error) {

    res.send(error)
}
else{
    res.send('Success')
}

})

smtpTransport.close()
  
})




export {
    sendEmail,
}