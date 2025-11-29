export const uploadImages = (req,res)=>{
    if (!req.file){
        return res.status(400).json({
            message: "no file uploaded"
        });

    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({imageUrl})

}

