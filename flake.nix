{
  description = "typesense-instantsearch-adapter development environment";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

  outputs =
    { nixpkgs, ... }:
    let
      inherit (nixpkgs) lib;
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
      ];
      forAllSystems = f: lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});

      # nixpkgs only packages Node by major version. "22", "v22" and "22.11.0" all give nodejs_22.
      nodeMajor = lib.head (
        lib.splitString "." (lib.removePrefix "v" (lib.trim (builtins.readFile ./.nvmrc)))
      );
    in
    {
      devShells = forAllSystems (
        pkgs:
        let
          nodejs =
            pkgs."nodejs_${nodeMajor}"
              or (throw ".nvmrc asks for Node ${nodeMajor}, which nixpkgs doesn't package");
        in
        {
          default = pkgs.mkShell {
            packages = [
              nodejs
              # `npm run testground` needs yarn 1.x: test/support/testground/yarn.lock is a v1 lockfile.
              (pkgs.yarn.override { inherit nodejs; })
            ];
          };
        }
      );

      formatter = forAllSystems (pkgs: pkgs.nixfmt);
    };
}
