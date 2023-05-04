# Minecraft Creative Studio For Java
 A Minecraft Creative Editor similar to [Minecraft Bedrock's Editor](https://learn.microsoft.com/en-us/minecraft/creator/documents/editorinstallation) with a goal to implement expandable tools opening a lot more creative freedom and opportunities to map builders, redstone engineers, modders, animators, etc. The Minecraft Creative Studio aims to include and provide most tools that were developed for the past years such as [MCEdit](https://www.worldpainter.net/), [World Painter](https://www.mcedit.net/), etc.

<br/>

## Development Requirements
This project mainly needs [`.NET 6.0.408 SDK`](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) and the latest [`Node.JS`](https://nodejs.org/en) installed in order to get started.

### Install the following ASP.NET Core Project Dependencies
- [ElectronNET.API](https://github.com/ElectronNET/Electron.NET)
- [ElectronNET CLI](https://www.nuget.org/packages/ElectronNET.CLI)
- [Microsoft.AspNetCore.SpaProxy](https://www.nuget.org/packages/microsoft.aspnetcore.spaproxy)

    You can also use Visual Studio 2022 to install the following packages using NuGet.

    Once installed, open your CLI in the root directory and enter the following:
    ```bash
    $ dotnet restore
    ```
### Install npm packages
navigate to the `app` directory of the project and enter the following:
```bash
$ npm i
```

## Usage
Follow these steps to get started developing
- make sure you have this repository cloned to your local computer using your prefered Git Management Software such as [Github Desktop](https://desktop.github.com/) or [Git CLI](https://cli.github.com/)
- Here are the useful commands you can use for development in order to get started:

    ```bash
    # compile the project as development for Website   
    $ dotnet run

    # compile and launch the application as a Desktop Application
    $ electronize start

    # wrap the project for deployment
    $ electronize build 
    ```
    Similar to `dotnet run`, you can also navigate to the app directory using `cd app` and type the following:

    ```bash
    $ npm start
    ```

<br/>

# Baby Steps...
- ### This is a passion project made by [SlamTheDragon](https://github.com/SlamTheDragon)
    - This project is not being actively developed. As of now, the plans for this projects are quite a bit unorganized.
    
    <br/>

    > The project author does not have enough skillset to properly develop this desktop application smoothly as what he have envisioned before [Minecraft Preview Editor](https://learn.microsoft.com/en-us/minecraft/creator/documents/editorinstallation) came out. If you wish to contribute to this project feel free to open any issues or pull requests or Join us with the discussion in this repository's [Discussions](https://github.com/SlamTheDragon/Minecraft-Creative-Studio-for-Java/discussions) tab.
