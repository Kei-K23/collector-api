"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (resource) => (req, res, next) => {
    try {
        resource.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        return next();
    }
    catch (e) {
        return res
            .status(400)
            .json({
            message: e.message,
        })
            .end();
    }
};
