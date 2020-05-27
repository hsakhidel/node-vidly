module.exports = function asyncMiddleWare(handler) {
  return async (req, res, next) => {
    try {
      await handler();
    } catch (ex) {
      next(ex);
    }
  };
};
