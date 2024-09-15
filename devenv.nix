{ pkgs, lib, ... }:

{
  difftastic.enable = true;
  imports = [ ];

  packages =
    lib.optionals pkgs.stdenv.isDarwin (
      with pkgs.darwin.apple_sdk.frameworks;
      [
        Security
        SystemConfiguration
        AppKit
        WebKit
        # Add other Darwin-specific packages here
      ]
    )
    ++ (with pkgs; [
      llvmPackages.libcxxStdenv
      llvmPackages.libcxxClang
      darwin.libobjc
      rustup
      # cargo-tauri
    ]);

  # Define Enviroment Virables
  env = { };

  # https://devenv.sh/scripts/
  # scripts.hello.exec = "";

  # enterShell = ''

  # '';

  # https://devenv.sh/languages/
  languages.rust = {
    enable = true;
    channel = "stable";
    components = [
      "rustc"
      "cargo"
      "clippy"
      "rustfmt"
      "rust-analyzer"
    ];
  };

  languages.javascript = {
    enable = true;
    bun = {
      enable = true;
      install.enable = true;
    };
  };

  languages.typescript = {
    enable = true;
  };

  # https://devenv.sh/integrations/dotenv/
  dotenv.enable = true;
}
