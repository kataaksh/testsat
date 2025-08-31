export const addTest = (req, res) => {
    // Logic to add a test
    res.status(200).send("Test added");
}   

export const getAllTests = (req, res) => {
    // Logic to get all tests
    res.status(200).send("All tests");
}

export const getTestById = (req, res) => {
    const { id } = req.params;        
    // Logic to get a test by ID
    res.status(200).send(`Test with ID: ${id}`);
}

export const updateTest = (req, res) => {
    const { id } = req.params;
    // Logic to update a test by ID
    res.status(200).send(`Test with ID: ${id} updated`);
}

export const deleteTest = (req, res) => {
    const { id } = req.params;
    // Logic to delete a test by ID
    res.status(200).send(`Test with ID: ${id} deleted`);
}

