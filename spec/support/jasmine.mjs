export default {
  spec_dir: "spec",
  spec_files: ["**/*[sS]pec.ts"],
  helpers: ["../node_modules/ts-node/register"],
  env: {
    stopSpecOnExpectationFailure: false,
    random: true,
    forbidDuplicateNames: true,
  },
};
