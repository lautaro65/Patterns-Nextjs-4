"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const NeuralNetworkPattern: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', updateDimensions)
    updateDimensions()

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const generateNodes = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
    }))
  }

  const nodes = generateNodes(30)

  const drawLine = (start: { x: number; y: number }, end: { x: number; y: number }, key: string) => {
    const length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2))
    if (length > 200) return null
  
    return (
      <motion.line
        key={key}
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />
    )
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-blue-900 overflow-hidden">
      <svg width="100%" height="100%">
      {nodes.map((node, i) => (
        <React.Fragment key={node.id}>
          {nodes.slice(i + 1).map((endNode) => drawLine(node, endNode, `line-${node.id}-${endNode.id}`))}
        </React.Fragment>
      ))}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="4"
            fill="#60A5FA"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
          />
        ))}
      </svg>
      {nodes.map((node) => (
        <motion.div
          key={`pulse-${node.id}`}
          className="absolute w-4 h-4 bg-blue-400 rounded-full"
          style={{ left: node.x - 8, top: node.y - 8 }}
          animate={{
            scale: [1, 3, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
      <div className="absolute inset-0 backdrop-blur-sm" />
    </div>
  )
}

export default NeuralNetworkPattern

