const authorizeRoles = (...allowedRoles)=>{
    return (req,res,next)=>{
        // console.log("User Role:", req.user.role);  
        // console.log("Allowed Roles:", allowedRoles);  
        if(!allowedRoles.includes(req.user.role))
            return res.status(403).json({message:"Access Denied"})
        next();
    }
}

module.exports = authorizeRoles;