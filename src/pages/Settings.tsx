
import React from "react";
import Layout from "../components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="users">Users & Permissions</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-4">Café Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cafe-name">Café Name</Label>
                    <Input id="cafe-name" placeholder="Enter café name" defaultValue="Arabian Café" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner-name">Owner Name</Label>
                    <Input id="owner-name" placeholder="Enter owner name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Enter address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Number</Label>
                    <Input id="contact" placeholder="Enter contact number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-id">Tax ID</Label>
                    <Input id="tax-id" placeholder="Enter tax ID" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-4">Operation Hours</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="opening-time">Opening Time</Label>
                    <Input id="opening-time" type="time" defaultValue="09:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="closing-time">Closing Time</Label>
                    <Input id="closing-time" type="time" defaultValue="22:00" />
                  </div>
                </div>
              </div>

              <Button>Save Changes</Button>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-4">User Management</h2>
                <p className="text-gray-500">User management settings will be displayed here.</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-4">System Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-backup">Automatic Backups</Label>
                      <p className="text-sm text-gray-500">Enable daily automatic backups</p>
                    </div>
                    <Switch id="auto-backup" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive daily sales reports via email</p>
                    </div>
                    <Switch id="notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-gray-500">Use dark theme for the application</p>
                    </div>
                    <Switch id="dark-mode" />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
