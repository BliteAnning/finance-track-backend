export const uploadImages = (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: "no file uploaded"
        });

    }

    const host = process.env.NODE_ENV === "production"
        ? "https://finance-backend-t6b6.onrender.com"
        : `${req.protocol}://${req.get("host")}`;

    const imageUrl = `${host}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
}

