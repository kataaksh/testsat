import Test from '../models/Test.js';

export const getAdminTests = async (req, res) => {
    try {
        const tests = await Test.find();
        res.json(tests);
    } catch (error) {
        console.error("Error fetching admin tests:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const getAdminTestById = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        if (!test) return res.status(404).send("Test not found");
        res.json(test);
    } catch (error) {
        console.error("Error fetching admin test by ID:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const updateAdminTest = async (req, res) => {
    try {
        const updates = req.body;
        const test = await Test.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true
        });
        if (!test) return res.status(404).send("Test not found");
        res.json({ message: "Test updated successfully", test });
    } catch (error) {
        console.error("Error updating admin test:", error);
        res.status(500).send("Internal Server Error");
    }
};