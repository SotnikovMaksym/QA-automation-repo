# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    # pkgs.go
    # pkgs.python311
    # pkgs.python311Packages.pip
    # pkgs.nodejs_20
    # pkgs.nodePackages.nodemon
    pkgs.nodejs_22
    pkgs.eslint_d
    pkgs.neovim
  ];

  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
      "dbaeumer.vscode-eslint"
      "esbenp.prettier-vscode"
      "franneck94.vscode-typescript-extension-pack"
      "streetsidesoftware.code-spell-checker"
      "YoavBls.pretty-ts-errors"
      "ms-vscode.js-debug"
      "zardoy.js-debug-extras"
      "google.geminicodeassist"
      "Codeium.codeium"
      "coderline.mocha-vscode"
      "CucumberOpen.cucumber-official"
      "ms-playwright.playwright"
      "Orta.vscode-jest"
      "rangav.vscode-thunder-client"
      "hbenl.vscode-mocha-test-adapter"
      "hbenl.vscode-test-explorer"
      "kavod-io.vscode-jest-test-adapter"
      "mhutchie.git-graph"
      "ms-azuretools.vscode-docker"
      "ms-vscode.test-adapter-converter"
      "pflannery.vscode-versionlens"
      "vitest.explorer"
      "google.gemini-cli-vscode-ide-companion"
      "ms-azuretools.vscode-containers"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        # web = {
        #   # Example: run "npm run dev" with PORT set to IDX's defined port for previews,
        #   # and show it in IDX's web preview panel
        #   command = ["npm" "run" "dev"];
        #   manager = "web";
        #   env = {
        #     # Environment variables to set for your server
        #     PORT = "$PORT";
        #   };
        # };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        # npm-install = "npm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # comment this if you are not using nvm
        unset-npm-prefix = "unset NPM_CONFIG_PREFIX";
        # Example: start a background task to watch and re-build backend code
        # watch-backend = "npm run watch-backend";
      };
    };
  };
}