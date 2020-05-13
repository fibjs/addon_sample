#include <stdio.h>

#include <jssdk/jsaddons.h>

void HelloAddon(jsaddons::t_init_context_value_ref ctx, jsaddons::t_addon_retValue& addonVal)
{
    js::Api* fibjs_api = js::fibjs_api;

    js::Runtime* jsruntime = fibjs_api->getCurrentJSRuntime();
    exlib::string str = jsruntime->NewString("abc").toString();

    js::Object addonModule = jsruntime->NewObject();
    addonModule.set("foo", jsruntime->NewString("bar"));
    addonModule.set("hello", jsruntime->NewString("world"));

    js::Object fibjsApiObj = jsruntime->NewObject();
    fibjsApiObj.set("engine", jsruntime->NewString(fibjs_api->getEngine()));
    addonModule.set("fibjsApi", fibjsApiObj);

    addonModule.set("number", jsruntime->NewNumber(2020));
    // addonModule.set("null", jsruntime->NewNull());
    addonModule.set("undefined", jsruntime->NewUndefined());
    addonModule.set("bool_true", jsruntime->NewBoolean(true));
    addonModule.set("bool_false", jsruntime->NewBoolean(false));

    js::FunctionCallback func;
    addonModule.set("func", jsruntime->NewFunction(func));

    addonVal = addonModule.toValue();
};
FIBJS_ADDON(HelloAddon);
