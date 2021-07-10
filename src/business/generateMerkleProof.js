const MerkleTree = require("../lib/MerkleTree");

const createTree = async ({commitment, blackhole, index}) => {
    let leaves = await blackhole.getCommitments(index);
    const MERKLE_TREE_HEIGHT = 7;
    let tree = new MerkleTree(MERKLE_TREE_HEIGHT, null, "blackhole");
    for (let i = 0; i < leaves.length; i++) {
        await tree.insert(leaves[i]);
    }
    // Find current commitment in the tree
    let leafIndex = -1;
    leaves.forEach((c, index) => {
        if (c === commitment) {
            leafIndex = index;
        }
    });
    if (leafIndex === -1) {
        return null;
    }
    return {tree, leafIndex};
}

module.exports = (blackhole) => async ({commitment, nullifier, index}) => {
    // Get all deposit commitment from smart contract and assemble merkle tree from them
    console.log('Getting current state from blackhole contract');
    let tree = await createTree({commitment, index, blackhole});
    if (!tree.tree) {
        tree = await createTree({commitment, index: index + 1, blackhole});
    }
    if (!tree.tree) {
        throw new Error("No commit index found");
    }
    const isExist = await blackhole.isExist(nullifier);

    if (isExist) {
        throw new Error("nullifier is already spent");
    }

    return tree.tree.path(tree.leafIndex);
}