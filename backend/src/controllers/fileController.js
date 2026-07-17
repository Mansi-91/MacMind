const {
  getAllFiles,
  searchFiles,
  advancedSearch,
  getDuplicateFiles,
} = require("../models/fileModel");

const getFiles = (req, res) => {
  try {
    const files = getAllFiles();

    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const search = (req, res) => {
  try {
    const keyword = req.query.q || "";

    const files = searchFiles(keyword);

    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const filterFiles = (req, res) => {
  try {
    const files = advancedSearch(req.query);

    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
const duplicates = (req, res) => {
  try {
    const files = getDuplicateFiles();

    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
module.exports = {
  getFiles,

  search,

  filterFiles,

  duplicates
};
