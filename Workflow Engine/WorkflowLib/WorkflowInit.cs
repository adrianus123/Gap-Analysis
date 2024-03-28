using OptimaJet.Workflow.Core.Builder;
using OptimaJet.Workflow.Core.Parser;
using OptimaJet.Workflow.Core.Runtime;
using OptimaJet.Workflow.DbPersistence;
using OptimaJet.Workflow.Plugins;
using System;
using System.Xml.Linq;

namespace WorkflowLib
{
    public class WorkflowInit
    {
        private static readonly Lazy<WorkflowRuntime> LazyRuntime = new Lazy<WorkflowRuntime>(InitWorkflowRuntime);
        public static WorkflowRuntime Runtime { get { return LazyRuntime.Value; } }
        public static string ConnectionString { get; set; }
        private static WorkflowRuntime InitWorkflowRuntime()
        {
            if (string.IsNullOrEmpty(ConnectionString))
            {
                throw new Exception("Please init ConnectionString before calling the Runtime!");
            }

            var dbProvider = new MSSQLProvider(ConnectionString);
            var builder = new WorkflowBuilder<XElement>(dbProvider, new XmlWorkflowParser(), dbProvider).WithDefaultCache();
            var runtime = new WorkflowRuntime()
                .WithBuilder(builder)
                .WithPersistenceProvider(dbProvider)
                .EnableCodeActions()
                .SwitchAutoUpdateSchemeBeforeGetAvailableCommandsOn()
                .AsSingleServer();

            var plugin = new BasicPlugin();
            runtime.WithPlugin(plugin);
            runtime.ProcessActivityChanged += (sender, args) => { };
            runtime.ProcessStatusChanged += (sender, args) => { };
            runtime.Start();

            return runtime;
        }
    }
}
