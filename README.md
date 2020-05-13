## Fibjs Addon Compilation Sample (WIP)

This repo shows how to compile fibjs's addon with fibjs_[vender].

### Pre-requisites

**fibjs**

make sure you have installed `fibjs`, to install fibjs, see [fibjs.org].

On Unix, just run shell below:

```shell
$ curl -s http://fibjs.org/download/installer.sh | sh
```

On Windows, you can download fibjs's installtion [here](http://fibjs.org/dist/) and run it, or download one portal package, and put its file position in your environment variable PATH.

**cmake**

we use cmake to build addon target for multiple platforms(Windows, Darwin, Linux) & architectures(x86, x64, arm, arm64, etc)

**vender**

we need C/C++ headers and cmake fragments in fibjs's [vender] source.

**NOTE** you don't need to download or clone [vender] repo manually, we prepare some simple scripts for you to download vender source, just see next chapter.

### Getting Startted

just run [./build.js](./build.js) on your shell.

**NOTE** if you are using Windows, it's recommended to run shell below on `git-bash`)

```shell
fibjs build.js
```

It would download [vender] source and unzip it for you.

Now go to first sample `hello` by:

```shell
cd hello;
mkdir -p build && cd build
rm -rm ./* && cmake ../
```

if you are on Unix platform, just run `make` to finish compilation. But if you are on Windows platform, just build .vcxproj by `msbuild.exe` or GUI(Visual Studio).

[cmake]:https://cmake.org
[vender]:https://github.com/fibjs/fibjs_vender/tree/dev
[fibjs.org]:http://fibjs.org