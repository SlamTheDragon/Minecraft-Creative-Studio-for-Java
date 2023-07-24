using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Main
{
    class Program
    {
        static async Task Main()
        {
            Console.WriteLine("Starting Application...");

            string applicationName = "MCSJv0.0.1-win_x64.exe";
            string applicationPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "app", "dist", "MCSJv0.0.1", applicationName);

            // Check if the application exists before launching it
            if (!File.Exists(applicationPath))
            {
                Console.WriteLine("Application not found: " + applicationPath);
                // Console.ReadLine();
                return;
            }

            // Create a new process instance
            Process process = new Process();

            // Configure the process start info
            ProcessStartInfo startInfo = new ProcessStartInfo
            {
                FileName = applicationPath,
                CreateNoWindow = true, // Set this to true to hide the process window
                UseShellExecute = false, // Set this to false to redirect input/output
                RedirectStandardOutput = true, // Redirect the standard output stream
                RedirectStandardError = true, // Redirect the standard error stream
            };

            process.StartInfo = startInfo;

            // Create a StringBuilder to store the logs
            StringBuilder outputLogs = new StringBuilder();
            StringBuilder errorLogs = new StringBuilder();

            // Define event handlers to capture the output and error data
            process.OutputDataReceived += (sender, e) =>
            {
                if (!string.IsNullOrWhiteSpace(e.Data))
                    outputLogs.AppendLine(e.Data);
            };

            process.ErrorDataReceived += (sender, e) =>
            {
                if (!string.IsNullOrWhiteSpace(e.Data))
                    errorLogs.AppendLine(e.Data);
            };

            // Start the process asynchronously
            try
            {
                process.Start();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error starting the application: " + ex.Message);
                return;
            }

            // Begin async reading of the output and error streams
            process.BeginOutputReadLine();
            process.BeginErrorReadLine();

            // Here you can do other tasks while the application is running
            // ...

            // Wait for the process to exit asynchronously
            await Task.Run(() => process.WaitForExit());

            // Process has exited, do any cleanup or post-processing here.
            Console.WriteLine("Application has exited.");

            // Now, you can access the logs captured during the process execution
            string capturedOutput = outputLogs.ToString();
            string capturedError = errorLogs.ToString();

            // Output the logs (you can save them to a file or use them as needed)
            // Console.WriteLine("Captured Output:");
            // Console.WriteLine(capturedOutput);

            // Console.WriteLine("Captured Error:");
            // Console.WriteLine(capturedError);
        }
    }
}
