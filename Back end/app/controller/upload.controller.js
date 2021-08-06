const db = require("../models");
const uploadFile = require("../middleware/upload");
const fs = require("fs");
const { type } = require("os");
const Uploads = db.uploads;
const Op = db.Sequelize.Op;
const baseUrl = "http://localhost:8050/files/";

const upload = async(req, res) => {

    try {
        await uploadFile(req, res);

        if (req.file == undefined) {

            return res.status(400).send({ message: "Please upload a file!" });

        }


        res.status(200).status({
            message: "Uploaded the file successfully: " + req.file.originalname,

        });
        Uploads.create({
                news_id: req.body.news_id,
                file: req.file.originalname,
                type: req.body.type
            })
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the News."
                });
            });
    } catch (err) {
        console.log(err);

        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }

        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/app/resources/uploads/";

    fs.readdir(directoryPath, function(err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });

        res.status(200).send(fileInfos);
    });
};

const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/app/resources/uploads/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};
const findOne = (req, res) => {
    const news_id = req.params.news_id;

    Uploads.findOne({ where: { news_id: news_id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Spac with idnews=" + idspac
            });
        });
};
module.exports = {
    upload,
    getListFiles,
    download,
    findOne
};