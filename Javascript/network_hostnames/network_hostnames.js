/** @param {NS} ns **/
export async function main(ns) {
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Get all hostnames on network by scanning each server recursively.

  // Start scan at 'home' server and add new servers to 'network_hostnames' array
  let network_hostnames = ["home"];
  let hostname = "home";

  // Scans a host and only add new hostnames to an array (due to the edge case of a self-closing network).
  let scan = async (network_hostnames, hostname) => {
    let scan_result = await ns.scan(hostname);

    for (let i = 0; i < scan_result.length; i++) {
      if (!network_hostnames.includes(scan_result[i])) {
        network_hostnames.push(scan_result[i]);
      }
    }
  };

  // Initial scan
  await scan(network_hostnames, hostname);
  let count_network_hostnames = network_hostnames.length;

  // Recursively scans a starting subset of the network to crawl the entire network by dynamically changing the stopping condition as new network nodes are found each iteration.
  let scan_network = async () => {
    for (let i = 0; i < network_hostnames.length; i++) {
      if (i < count_network_hostnames) {
        await scan(network_hostnames, network_hostnames[i]);
        count_network_hostnames = network_hostnames.length;
      }
    }
  };

  // Scan network for hostnames
  await scan_network(network_hostnames);
  alert(console.log(network_hostnames));

  // Save the data to computer by downloading it through a URL.
  // The array of network hostnames is transformed to a Javascript blob object.
  // A URL is then created from the blob so that it can be downloaded.
  let jsonData = JSON.stringify(network_hostnames);
  let file = new Blob([jsonData], { type: "text/plain" });
  let data_object_URL = URL.createObjectURL(file);
  await ns.wget(data_object_URL, "data_network_hostnames.txt");

  //["n00dles","foodnstuff","sigma-cosmetics","joesguns","hong-fang-tea","harakiri-sushi","iron-gym","darkweb","home","max-hardware","zer0","CSEC","nectar-net","neo-net","phantasy","silver-helix","omega-net","avmnite-02h","computek","netlink","the-hub","johnson-ortho","crush-fitness","summit-uni","catalyst","rothman-uni","zb-institute","I.I.I.I","syscore","lexo-corp","millenium-fitness","alpha-ent","rho-construction","aevum-police","snap-fitness","galactic-cyber","global-pharm","aerocorp","unitalife","omnia","deltaone","univ-energy","defcomm","icarus","zeus-med","solaris","infocomm","zb-def","nova-med","taiyang-digital","titan-labs","run4theh111z","microdyne","applied-energetics","fulcrumtech","stormtech","vitalife","helios","4sigma","omnitek","kuai-gong",".","b-and-a","blade","clarkinc","powerhouse-fitness","nwo","fulcrumassets","ecorp","megacorp","The-Cave"]

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Create a table of the network edges
  let network_table = [["hostname", ...network_hostnames]];

  // Create a n x n matrix where n equals the number of nodes on the network
  // Edges between nodes are denoted by '1' and no edges are denoted by '0'.
  for (let i = 0; i < network_hostnames.length; i++) {
    network_table[i + 1] = [network_hostnames[i]];
    let result = ns.scan(network_hostnames[i]);
    for (let j = 0; j < network_hostnames.length; j++) {
      if (i === j) {
        network_table[i + 1].push("/");
      } else if (result.includes(network_hostnames[j])) {
        network_table[i + 1].push(1);
      } else {
        network_table[i + 1].push(0);
      }
    }
  }
  // Save the data to computer by downloading it through a URL.
  // The array of network hostnames is transformed to a Javascript blob object.
  // A URL is then created from the blob so that it can be downloaded.
  let jsonData_network_table = JSON.stringify(network_table);
  let file_network_table = new Blob([jsonData_network_table], {
    type: "text/plain",
  });
  let data_network_table_object_URL = URL.createObjectURL(file_network_table);
  await ns.wget(data_network_table_object_URL, "data_network_table.txt");

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Create a data representation of the network hostnames and their respective depth from 'home'
  //[['home'],['n00dles', 'foodnstuff'],...]

  let network_depth = [["home"]];
  let nh = ["home"];

  let depth_previous = "";
  // Recursively scan each element from the last depth array on network_depth and add new network hostnames as next level.
  let scan_depth = (network_depth) => {
    let depth = network_depth.length - 1;
    let array = [];

    if (depth_previous !== depth) {
      depth_previous = depth;
    } else {
      ns.tprint("end of depth");
      return;
    }

    ns.tprint("Scanning next depth : ");

    for (let i = 0; i < network_depth[depth].length; i++) {
      let result = ns.scan(network_depth[depth][i]);
      for (let result_iter = 0; result_iter < result.length; result_iter++) {
        if (!nh.includes(result[result_iter])) {
          array.push(result[result_iter]);
          nh.push(result[result_iter]);
        }
      }
    }
    if (array.length !== 0) {
      network_depth.push(array);
    }
    scan_depth(network_depth);
  };

  scan_depth(network_depth);

  // Save the data to computer by downloading it through a URL.
  // The array of network hostnames is transformed to a Javascript blob object.
  // A URL is then created from the blob so that it can be downloaded.
  let data_network_depth = JSON.stringify(network_depth);
  let file_network_depth = new Blob([data_network_depth], {
    type: "text/plain",
  });
  let data_network_depth_URL = URL.createObjectURL(file_network_depth);
  await ns.wget(data_network_depth_URL, "data_network_depth.txt");

  //[["home"], ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "iron-gym", "darkweb", "test_001", "test_002", "test_003", "test_004", "test_005", "test_006", "test_007", "test_008", "test_009", "test_010", "test_011", "test_012", "test_013", "test_014", "test_015", "test_016", "test_017", "test_018", "test_019", "test_020", "test_021", "test_022", "test_023", "test_024", "test_025"], ["zer0", "nectar-net", "max-hardware", "CSEC"], ["neo-net", "phantasy", "silver-helix", "omega-net"], ["netlink", "the-hub", "johnson-ortho", "computek", "crush-fitness", "avmnite-02h"], ["rothman-uni", "syscore", "summit-uni", "I.I.I.I", "zb-institute", "catalyst"], ["millenium-fitness", "lexo-corp", "rho-construction", "alpha-ent", "aevum-police"], ["aerocorp", "global-pharm", "galactic-cyber", "snap-fitness"], ["deltaone", "unitalife", "omnia"], ["defcomm", "icarus", "solaris", "zeus-med", "univ-energy"], ["zb-def", "taiyang-digital", "infocomm", "nova-med"], ["titan-labs", "microdyne", "applied-energetics", "run4theh111z"], ["fulcrumtech", "helios", "stormtech", "vitalife"], ["omnitek", "kuai-gong", "4sigma", "."], ["clarkinc", "powerhouse-fitness", "b-and-a", "blade", "nwo"], ["megacorp", "ecorp", "fulcrumassets", "The-Cave"]];

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Display all files on servers and all cct files on servers
  let hostnames_files = {};
  let hostnames_coding_contracts = {};
  for (let i = 0; i < network_hostnames.length; i++) {
    hostnames_files = {
      ...hostnames_files,
      [network_hostnames[i]]: ns.ls(network_hostnames[i]),
    };
    hostnames_coding_contracts = {
      ...hostnames_coding_contracts,
      [network_hostnames[i]]: ns.ls(network_hostnames[i], "cct"),
    };
  }
  // Save the data to computer by downloading it through a URL.
  // The array of network hostnames is transformed to a Javascript blob object.
  // A URL is then created from the blob so that it can be downloaded.
  let data_hostnames_files = JSON.stringify(hostnames_files);
  let file_hostnames_files = new Blob([data_hostnames_files], {
    type: "text/plain",
  });
  let data_hostnames_files_URL = URL.createObjectURL(file_hostnames_files);
  await ns.wget(data_hostnames_files_URL, "data_hostnames_files.txt");

  let data_hostnames_coding_contracts = JSON.stringify(
    hostnames_coding_contracts
  );
  let file_hostnames_coding_contracts = new Blob(
    [data_hostnames_coding_contracts],
    {
      type: "text/plain",
    }
  );
  let data_hostnames_coding_contracts_URL = URL.createObjectURL(
    file_hostnames_coding_contracts
  );
  await ns.wget(
    data_hostnames_coding_contracts_URL,
    "data_hostnames_coding_contracts.txt"
  );
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
