
using System;
using System.Collections.Generic;
using System.Linq;
using GroupProjectApi.Modules.Common.Attributes;
using Microsoft.Extensions.DependencyInjection;

namespace GroupProjectApi.Modules.Configuration {
    public static class ServiceCollectionExtensions {

        /// <summary>
        /// Finds all classes decorated with the [TransientService] or [SingletonService] attribute
        /// and adds them to the Dependency Injection container according to their respective lifetimes
        /// </summary>
        /// <param name="services"></param>
        public static void AddAppServices(this IServiceCollection services) {
            // Transient scope will create a new instance of the class each time it is requested
            services.AddServicesOfType<TransientServiceAttribute>(ServiceLifetime.Transient);
            // Singleton scope will create a single instance of the class that is reused whenever it is requested
            services.AddServicesOfType<SingletonServiceAttribute>(ServiceLifetime.Singleton);
        }

        private static void AddServicesOfType<T>(this IServiceCollection services, ServiceLifetime serviceLifetime) where T : Attribute {
            // Retrieve list of types that implement specified class/interface
            var serviceImplementations = GetAllImplementationsOfType<T>();

            // Add each service class to DI container according to specified lifetime attribute type
            foreach (var serviceType in serviceImplementations) {
                switch (serviceLifetime) {
                    case ServiceLifetime.Singleton: 
                        services.AddSingleton(serviceType);
                        break;
                    case ServiceLifetime.Scoped:
                        services.AddScoped(serviceType);
                        break;
                    case ServiceLifetime.Transient:
                        services.AddTransient(serviceType);
                        break;
                    default:
                        services.AddTransient(serviceType);
                        break;
                }
            }
        }

        private static IEnumerable<Type> GetAllImplementationsOfType<T>() where T : Attribute {
            // Finds all classes in the current (GroupProjectApi) assembly decorated with the specified attribute type
            return AppDomain.CurrentDomain.GetAssemblies().SelectMany(assembly => assembly.GetTypes().Where(type =>
                type.GetCustomAttributes(typeof(T), true).Length > 0
            ));
        }
    } 
 }
