import React from 'react';
import TargetCursor from '../components/TargetCursor';
import ElectricBorder from '../components/ui/ElectricBorder';
import PillNav from '../components/ui/PillNav';

export default function CursorDemo() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          TargetCursor Demo
        </h1>
        
        <p className="text-lg text-center mb-12 text-gray-300">
          Hover over the elements below to see the custom cursor in action
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <button className="cursor-target w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
              Click me!
            </button>
            
            <div className="cursor-target p-6 bg-green-600 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">Hover Target</h3>
            </div>
            
            <div className="cursor-target p-6 bg-purple-600 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">Another Target</h3>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="cursor-target p-6 bg-orange-600 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">Orange Target</h3>
            </div>
            
            <div className="cursor-target p-6 bg-red-600 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">Red Target</h3>
            </div>
            
            <div className="cursor-target p-6 bg-teal-600 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">Teal Target</h3>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-400">
            The cursor will expand into corners when hovering over elements with the "cursor-target" class
          </p>
        </div>

        {/* ElectricBorder Demo Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            ElectricBorder Demo
          </h2>
          
          <p className="text-lg text-center mb-12 text-gray-300">
            Experience the animated glowing border effects
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Study Streak Style */}
            <ElectricBorder
              color="#ed820e"
              speed={1}
              chaos={0.5}
              thickness={2}
              style={{ borderRadius: 16 }}
            >
              <div className="cursor-target p-6 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl text-center border border-blue-500/20">
                <div className="text-3xl mb-2">🔥</div>
                <h3 className="text-xl font-semibold mb-2">Study Streak</h3>
                <p className="text-blue-200 text-sm">7 Day Streak</p>
              </div>
            </ElectricBorder>

            {/* Success Style */}
            <ElectricBorder
              color="#10b981"
              speed={1.5}
              chaos={0.3}
              thickness={3}
              style={{ borderRadius: 20 }}
            >
              <div className="cursor-target p-6 bg-gradient-to-br from-green-900 to-green-700 rounded-2xl text-center border border-green-500/20">
                <div className="text-3xl mb-2">✅</div>
                <h3 className="text-xl font-semibold mb-2">Achievement</h3>
                <p className="text-green-200 text-sm">Goal Completed</p>
              </div>
            </ElectricBorder>

            {/* Warning Style */}
            <ElectricBorder
              color="#f59e0b"
              speed={0.8}
              chaos={0.7}
              thickness={2}
              style={{ borderRadius: 12 }}
            >
              <div className="cursor-target p-6 bg-gradient-to-br from-yellow-900 to-yellow-700 rounded-2xl text-center border border-yellow-500/20">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Energy Boost</h3>
                <p className="text-yellow-200 text-sm">High Activity</p>
              </div>
            </ElectricBorder>

            {/* Danger Style */}
            <ElectricBorder
              color="#ef4444"
              speed={2}
              chaos={0.9}
              thickness={4}
              style={{ borderRadius: 24 }}
            >
              <div className="cursor-target p-6 bg-gradient-to-br from-red-900 to-red-700 rounded-2xl text-center border border-red-500/20">
                <div className="text-3xl mb-2">🚨</div>
                <h3 className="text-xl font-semibold mb-2">Alert</h3>
                <p className="text-red-200 text-sm">Action Required</p>
              </div>
            </ElectricBorder>

            {/* Purple Style */}
            <ElectricBorder
              color="#8b5cf6"
              speed={1.2}
              chaos={0.6}
              thickness={2}
              style={{ borderRadius: 18 }}
            >
              <div className="cursor-target p-6 bg-gradient-to-br from-purple-900 to-purple-700 rounded-2xl text-center border border-purple-500/20">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="text-xl font-semibold mb-2">Target</h3>
                <p className="text-purple-200 text-sm">Focus Mode</p>
              </div>
            </ElectricBorder>

            {/* Custom Style */}
            <ElectricBorder
              color="#06b6d4"
              speed={0.5}
              chaos={0.2}
              thickness={1}
              style={{ borderRadius: 8 }}
            >
              <div className="cursor-target p-6 bg-gradient-to-br from-cyan-900 to-cyan-700 rounded-2xl text-center border border-cyan-500/20">
                <div className="text-3xl mb-2">💎</div>
                <h3 className="text-xl font-semibold mb-2">Premium</h3>
                <p className="text-cyan-200 text-sm">VIP Status</p>
              </div>
            </ElectricBorder>
          </div>
        </div>

        {/* PillNav Demo Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            PillNav Demo
          </h2>
          
          <p className="text-lg text-center mb-12 text-gray-300">
            Experience the animated pill-based navigation system
          </p>
          
          <div className="space-y-8">
            {/* Default Style */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Default Style</h3>
              <div className="flex justify-center">
                                 <PillNav
                   logo="/student-dashboard-logo.svg"
                   logoAlt="Demo Logo"
                   items={[
                     { label: 'Home', href: '/demo' },
                     { label: 'About', href: '/demo/about' },
                     { label: 'Services', href: '/demo/services' },
                     { label: 'Contact', href: '/demo/contact' }
                   ]}
                   activeHref="/demo"
                   ease="power2.easeOut"
                   baseColor="hsl(142, 25%, 45%)"
                   pillColor="hsl(142, 15%, 97%)"
                   hoveredPillTextColor="hsl(142, 15%, 95%)"
                   pillTextColor="hsl(142, 25%, 45%)"
                 />
              </div>
            </div>

            {/* Alternative Style */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Alternative Style</h3>
              <div className="flex justify-center">
                                 <PillNav
                   logo="/student-dashboard-logo.svg"
                   logoAlt="Demo Logo"
                   items={[
                     { label: 'Dashboard', href: '/demo/dashboard' },
                     { label: 'Analytics', href: '/demo/analytics' },
                     { label: 'Reports', href: '/demo/reports' },
                     { label: 'Settings', href: '/demo/settings' }
                   ]}
                   activeHref="/demo/dashboard"
                   ease="power3.easeOut"
                   baseColor="hsl(142, 35%, 35%)"
                   pillColor="hsl(142, 15%, 97%)"
                   hoveredPillTextColor="hsl(142, 15%, 95%)"
                   pillTextColor="hsl(142, 35%, 35%)"
                 />
              </div>
            </div>

            {/* Dark Style */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Dark Style</h3>
              <div className="flex justify-center">
                                 <PillNav
                   logo="/student-dashboard-logo.svg"
                   logoAlt="Demo Logo"
                   items={[
                     { label: 'Projects', href: '/demo/projects' },
                     { label: 'Tasks', href: '/demo/tasks' },
                     { label: 'Team', href: '/demo/team' },
                     { label: 'Calendar', href: '/demo/calendar' }
                   ]}
                   activeHref="/demo/projects"
                   ease="power2.easeOut"
                   baseColor="hsl(142, 20%, 10%)"
                   pillColor="hsl(142, 15%, 95%)"
                   hoveredPillTextColor="hsl(142, 15%, 97%)"
                   pillTextColor="hsl(142, 20%, 10%)"
                 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
