const {
  calculateSurgePricing,
  simulateSurgePricing,
} = require("../services/surgePricingService");
const logger = require("../config/logger");

const surgePricingController = {
  getSurgePricing: async (req, res) => {
    try {
      const { latitude, longitude } = req.body;
      logger.info(
        `Received surge pricing request for lat: ${latitude}, lon: ${longitude}`
      );

      // Input validation
      if (!latitude || !longitude) {
        logger.warn("Invalid request: Missing latitude or longitude");
        return res
          .status(400)
          .json({ error: "Latitude and longitude are required" });
      }

      // Parse latitude and longitude to floats
      const parsedLat = parseFloat(latitude);
      const parsedLon = parseFloat(longitude);

      // Validate parsed values
      if (isNaN(parsedLat) || isNaN(parsedLon)) {
        logger.warn(
          `Invalid request: Invalid latitude (${latitude}) or longitude (${longitude})`
        );
        return res.status(400).json({ error: "Invalid latitude or longitude" });
      }

      const response = await calculateSurgePricing(parsedLat, parsedLon);
      logger.info(
        `Surge pricing calculated successfully for lat: ${parsedLat}, lon: ${parsedLon}`
      );

      res.json(response);
    } catch (error) {
      logger.error(`Error in getSurgePricing controller: ${error.message}`, {
        error,
      });
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getSimulatedPricing: async (req, res) => {
    try {
      const simulateData = req.body;

      // Calculate surge pricing
      // This will emit the result via WebSocket
      await simulateSurgePricing(simulateData);

      logger.info("Simulated surge pricing calculation initiated");
      res
        .status(202)
        .json({ message: "Simulated surge pricing calculation initiated" });
    } catch (error) {
      logger.error(
        `Error in getSimulatedPricing controller: ${error.message}`,
        { error }
      );
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = surgePricingController;
