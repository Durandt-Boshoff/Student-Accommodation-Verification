let properties = [
  {
    id: 1,
    name: 'Jorissen Street Student Lofts',
    city: 'Johannesburg',
    suburb: 'Braamfontein',
    address: '45 Jorissen Street, Braamfontein',
    monthly_rent: 4800,
    verification_status: 'Platform Verified',
    verified: true,
    rooms_available: 6
  },
  {
    id: 2,
    name: 'De Beer Campus Suites',
    city: 'Johannesburg',
    suburb: 'Braamfontein',
    address: '82 De Beer Street, Braamfontein',
    monthly_rent: 5600,
    verification_status: 'Institution Accredited',
    verified: true,
    rooms_available: 3
  },
  {
    id: 3,
    name: 'Melle Street Student Res',
    city: 'Johannesburg',
    suburb: 'Braamfontein',
    address: '29 Melle Street, Braamfontein',
    monthly_rent: 3900,
    verification_status: 'Unverified',
    verified: false,
    rooms_available: 4
  }
];

let nextId = 4;

// GET /api/properties (supports optional ?city=, ?suburb=, ?maxPrice=, and ?verification_status=)
const getAllProperties = (req, res) => {
  try {
    const { city, suburb, maxPrice, verification_status } = req.query;
    let results = [...properties];

    if (city) {
      results = results.filter(
        (p) => p.city && p.city.toLowerCase() === String(city).toLowerCase()
      );
    }

    if (suburb) {
      results = results.filter(
        (p) => p.suburb && p.suburb.toLowerCase() === String(suburb).toLowerCase()
      );
    }

    if (verification_status) {
      results = results.filter(
        (p) =>
          p.verification_status &&
          p.verification_status.toLowerCase() === String(verification_status).toLowerCase()
      );
    }

    if (maxPrice !== undefined && maxPrice !== '') {
      const limit = Number(maxPrice);
      if (!Number.isNaN(limit)) {
        results = results.filter((p) => Number(p.monthly_rent) <= limit);
      }
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/properties/:id
const getPropertyById = (req, res) => {
  try {
    const id = Number(req.params.id);
    const property = properties.find((p) => p.id === id);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/properties
const createProperty = (req, res) => {
  try {
    const {
      name,
      city,
      suburb,
      address,
      monthly_rent,
      verification_status,
      verified,
      rooms_available
    } = req.body;

    if (!name || !city || monthly_rent === undefined) {
      return res
        .status(400)
        .json({ error: 'name, city, and monthly_rent are required' });
    }

    const resolvedStatus =
      verification_status || (verified ? 'Platform Verified' : 'Unverified');
    const isVerified =
      verified !== undefined
        ? Boolean(verified)
        : resolvedStatus !== 'Unverified';

    const newProperty = {
      id: nextId++,
      name: String(name),
      city: String(city),
      suburb: suburb ? String(suburb) : 'Braamfontein',
      address: address ? String(address) : '',
      monthly_rent: Number(monthly_rent),
      verification_status: String(resolvedStatus),
      verified: isVerified,
      rooms_available: rooms_available !== undefined ? Number(rooms_available) : 1
    };

    properties.push(newProperty);
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty
};