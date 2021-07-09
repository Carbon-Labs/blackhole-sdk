const MerkleTree = require("../lib/MerkleTree");
module.exports = (blackhole) => async ({commitment, nullifier, index}) => {
    // Get all deposit events from smart contract and assemble merkle tree from them
    console.log('Getting current state from tornado contract');
    const leaves = await blackhole.getCommitments(index);
    console.log(leaves);
    const MERKLE_TREE_HEIGHT = 7;
    const tree = new MerkleTree(MERKLE_TREE_HEIGHT, null, "blackhole");

    for (let i = 0; i < leaves.length; i++) {
        await tree.insert(leaves);
    }

    // Find current commitment in the tree
    let leafIndex = -1;
    leaves.forEach((c, index) => {
        if (c === commitment) {
            leafIndex = index;
        }
    });

    if (leafIndex === -1) {
        throw new Error("No commit index found");
    }

    const isExist = await blackhole.isExist(nullifier);

    if (isExist) {
        throw new Error("nullifier is already spent");
    }

    return tree.path(leafIndex);
}