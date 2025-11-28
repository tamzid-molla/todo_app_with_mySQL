"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const FilterTodo = ({filter, setFilter}) => {

    return (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Task Filters</CardTitle>
            <CardDescription>Filter tasks by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant={filter === "all" ? "default" : "outline"} 
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={filter === "active" ? "default" : "outline"} 
                onClick={() => setFilter("active")}
              >
                Active
              </Button>
              <Button 
                variant={filter === "completed" ? "default" : "outline"} 
                onClick={() => setFilter("completed")}
              >
                Completed
              </Button>
            </div>
          </CardContent>
        </Card>
    );
};

export default FilterTodo;