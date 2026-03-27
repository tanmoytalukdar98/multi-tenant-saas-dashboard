const Tenant = require("../models/Tenant");

module.exports = async (req, res, next) => {
  try {
    const tenantId = req.params.tenant;

    const tenant = await Tenant.findOne({ name: tenantId });
    if (!tenant) return res.status(404).json({ msg: "Tenant not found" });

    req.tenant = tenant;
    next();
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};