import React, { ReactElement } from 'react'
import Screen from '../components/Screen'
import Lang from '../services/Lang'
import { Link } from 'react-router'

function Home(): ReactElement {
  return (
    <Screen title={Lang.get('home.title')}>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {Lang.get('home.title')}
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <section className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-bold mb-4">
                Manage Your Social Clubs
              </h2>
              <p className="text-gray-700 mb-4">
                Our web app allows you to easily manage your social clubs,
                events, and members. Stay organized and keep track of everything
                in one place.
              </p>
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Get Started
              </Link>
            </section>
            <section className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-bold mb-4">Features</h2>
              <ul className="list-disc list-inside text-gray-700">
                <li className="mb-2">Create and manage events</li>
                <li className="mb-2">Track member attendance</li>
                <li className="mb-2">Send notifications and reminders</li>
                <li className="mb-2">Generate reports and analytics</li>
              </ul>
            </section>
            <section className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                  <p className="text-gray-700">
                    "This app has made managing our club so much easier!" - Jane
                    Doe
                  </p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                  <p className="text-gray-700">
                    "I love the event management features. Highly recommend!" -
                    John Smith
                  </p>
                </div>
              </div>
            </section>
            <section className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                Have any questions or need support? Feel free to reach out to
                us.
              </p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Contact Support
              </button>
            </section>
          </div>
        </main>
      </div>
    </Screen>
  )
}

export default Home
