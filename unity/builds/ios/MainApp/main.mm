#include <UnityFramework/UnityFramework.h>

UnityFramework* UnityFrameworkLoad()
{
    NSString* bundlePath = nil;
    bundlePath = [[NSBundle mainBundle] bundlePath];
    bundlePath = [bundlePath stringByAppendingString: @"/Frameworks/UnityFramework.framework"];

    NSBundle* bundle = [NSBundle bundleWithPath: bundlePath];
    if ([bundle isLoaded] == false) [bundle load];

    UnityFramework* ufw = [bundle.principalClass getInstance];
    if (![ufw appController])
    {
        // unity is not initialized
        [ufw setExecuteHeader: &_mh_execute_header];
    }
    return ufw;
}

int main(int argc, char* argv[])
{
    @autoreleasepool
    {
        id ufw = UnityFrameworkLoad();
        [ufw setDataBundleId: "com.unity3d.framework"];
        // On Demand Resources are not supported in this case. To make them work instead of the calls above
        // you need to copy Data folder to your native application (With script at Build Phases) and
        // skip a calls above since by default Data folder expected to be in mainBundle.
        [ufw runUIApplicationMainWithArgc: argc argv: argv];
        return 0;
    }
}
