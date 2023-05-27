using System;
using System.IO;

namespace MinecraftStudio.Internal.Logging
{
    public class InternalLog
    {
        private static Logger logger;

        static InternalLog()
        {
            logger = new Logger();
        }

        public static void Debug(string message, Origin sysOrigin)
        {
            logger.Debug(message, sysOrigin);
        }

        public static void Info(string message, Origin sysOrigin)
        {
            logger.Info(message, sysOrigin);
        }

        public static void Warn(string message, Origin sysOrigin)
        {
            logger.Warn(message, sysOrigin);
        }

        public static void Error(string message, Origin sysOrigin)
        {
            logger.Error(message, sysOrigin);
        }
    }

    public enum LogLevel
    {
        DEBUG,
        INFO,
        WARN,
        ERROR
    }

    public enum Origin
    {
        // MAIN: Filesystems, Project Management, Threading, Etc.
        MAIN,
        // SERVER: Websockets, Middleware, Etc.
        SERVER,
        // INTERFACE: Electron, GUI Logs, Etc.
        INTERFACE
    }

    public sealed class Logger
    {
        private bool isDebug = true;

        private static readonly Logger instance = new Logger();

        private string FilePath { get; set; }

        public Logger()
        {
            string appName = "Minecraft Creative Studio";
            string appDataFolder = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
            string logFolderPath = Path.Combine(appDataFolder, appName, "Logs");

            // create the directory if it doesn't exist
            if (!Directory.Exists(logFolderPath))
            {
                Directory.CreateDirectory(logFolderPath);
            }

            this.FilePath = Path.Combine(logFolderPath, "latest.log");
        }

        public static Logger Instance
        {
            get
            {
                return instance;
            }
        }

        public void Log(LogLevel level, Origin origin, string message)
        {
            string logEntry = $"{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")} [{level}] [{origin}] {message}";

            // Write to console
            System.Console.WriteLine(logEntry);

            // Write to log file
            using (StreamWriter writer = File.AppendText(this.FilePath))
            {
                writer.WriteLine(logEntry);
            }
        }

        public void Debug(string message, Origin sysOrigin)
        {
            if (isDebug)
            {
                Log(LogLevel.DEBUG, sysOrigin, message);
            }
            return;
        }

        public void Info(string message, Origin sysOrigin)
        {
            Log(LogLevel.INFO, sysOrigin, message);
        }

        public void Warn(string message, Origin sysOrigin)
        {
            Log(LogLevel.WARN, sysOrigin, message);
        }

        public void Error(string message, Origin sysOrigin)
        {
            Log(LogLevel.ERROR, sysOrigin, message);
        }
    }
}
