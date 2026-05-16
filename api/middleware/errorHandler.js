export function notFound(req, res) {
  res.status(404).json({ message: "Not Found" });
}

export function errorHandler(logger) {
  // eslint-disable-next-line no-unused-vars
  return (err, req, res, next) => {
    const status = Number.isInteger(err?.status) ? err.status : err?.statusCode || 500;
    const message =
      status >= 500 ? "Internal Server Error" : err?.message || "Bad Request";

    if (logger?.error) logger.error(err?.message || message);
    else console.error(err);

    res.status(status).json({
      message,
      ...(status >= 500 ? {} : { details: err?.details }),
    });
  };
}
