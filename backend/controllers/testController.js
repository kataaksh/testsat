import Test from '../models/Test.js';

export const addTest = async (req, res) => {
    try {
        const { testname, questions } = req.body;

        if (!testname) {
            return res.status(400).send("Test name is required");
        }
        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(400).send("Questions array required");
        }

        const test = new Test({
            testname,
            questions
        });
        await test.save();

        res.status(201).json({ message: "Test added", test });
    } catch (error) {
        console.error("Error adding test:", error);
        res.status(500).send("Internal Server Error");
    }
}   

export const  getTestById = async (req, res) => {
    // Logic to get a test by ID

    try {
        const test = await Test.findById(req.params.id);

        if(!test) return res.status(404).send("Test not found");

        res.json(test);

    } catch (error) {
        console.error("Error fetching tests:", error);
        res.status(500).send("Internal Server Error");
    }
}



export const getAllTests = async (req, res) => {
    // Logic to get all tests

    try {
        const tests = await Test.find();
        res.json(tests);
    } catch (error) {
        console.error("Error fetching tests:", error);
        res.status(500).send("Internal Server Error");
    }
}

export const updateTest = async (req, res) => {
     // Logic to update a test by ID
try {


    const updates = req.body;

    const test = await Test.findByIdAndUpdate(req.params.id, updates, {
        new: true,
        runValidators: true
    });

    if(!test) return res.status(404).send("Test not found");

    res.json({message: "Test updated successfully", test});

    } catch (error) {
        console.error("Error updating test:", error);
        res.status(500).send("Internal Server Error");
    }

}

export const deleteTest = async (req, res) => {

    // Logic to delete a test by ID

    try {
        const test = await Test.findByIdAndDelete(req.params.id);
        if(!test) return res.status(404).send("Test not found");

        res.status(200).send(`Test with ID: ${req.params.id} deleted`, test);

    }
    catch (error) {
        console.error("Error deleting test:", error);
        res.status(500).send("Internal Server Error");
    }

}

