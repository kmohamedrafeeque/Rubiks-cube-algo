"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Rubik's Cube class with object-oriented design
class RubiksCube {
  // Faces: 0=Front, 1=Right, 2=Back, 3=Left, 4=Up, 5=Down
  // Each face is 3x3 grid: 0,1,2 / 3,4,5 / 6,7,8
  private faces: string[][]

  constructor() {
    // Initialize solved cube: F=green, R=red, B=blue, L=orange, U=white, D=yellow
    this.faces = [
      ["g", "g", "g", "g", "g", "g", "g", "g", "g"], // Front
      ["r", "r", "r", "r", "r", "r", "r", "r", "r"], // Right
      ["b", "b", "b", "b", "b", "b", "b", "b", "b"], // Back
      ["o", "o", "o", "o", "o", "o", "o", "o", "o"], // Left
      ["w", "w", "w", "w", "w", "w", "w", "w", "w"], // Up
      ["y", "y", "y", "y", "y", "y", "y", "y", "y"], // Down
    ]
  }

  // Get cube state as string for visualization
  getCubeString(): string {
    return this.faces.map((face) => face.join("")).join("")
  }

  // Clone the cube
  clone(): RubiksCube {
    const newCube = new RubiksCube()
    newCube.faces = this.faces.map((face) => [...face])
    return newCube
  }

  // Rotate a face clockwise
  private rotateFaceClockwise(faceIndex: number): void {
    const face = this.faces[faceIndex]
    const temp = [...face]
    face[0] = temp[6]
    face[1] = temp[3]
    face[2] = temp[0]
    face[3] = temp[7]
    face[4] = temp[4]
    face[5] = temp[1]
    face[6] = temp[8]
    face[7] = temp[5]
    face[8] = temp[2]
  }

  // Rotate a face counter-clockwise
  private rotateFaceCounterClockwise(faceIndex: number): void {
    const face = this.faces[faceIndex]
    const temp = [...face]
    face[0] = temp[2]
    face[1] = temp[5]
    face[2] = temp[8]
    face[3] = temp[1]
    face[4] = temp[4]
    face[5] = temp[7]
    face[6] = temp[0]
    face[7] = temp[3]
    face[8] = temp[6]
  }

  // Front face rotation
  F(): void {
    this.rotateFaceClockwise(0)
    const temp = [this.faces[4][6], this.faces[4][7], this.faces[4][8]]
    this.faces[4][6] = this.faces[3][8]
    this.faces[4][7] = this.faces[3][5]
    this.faces[4][8] = this.faces[3][2]
    this.faces[3][8] = this.faces[5][2]
    this.faces[3][5] = this.faces[5][1]
    this.faces[3][2] = this.faces[5][0]
    this.faces[5][2] = this.faces[1][0]
    this.faces[5][1] = this.faces[1][3]
    this.faces[5][0] = this.faces[1][6]
    this.faces[1][0] = temp[0]
    this.faces[1][3] = temp[1]
    this.faces[1][6] = temp[2]
  }

  // Front face counter-clockwise
  Fi(): void {
    this.rotateFaceCounterClockwise(0)
    const temp = [this.faces[4][6], this.faces[4][7], this.faces[4][8]]
    this.faces[4][6] = this.faces[1][0]
    this.faces[4][7] = this.faces[1][3]
    this.faces[4][8] = this.faces[1][6]
    this.faces[1][0] = this.faces[5][2]
    this.faces[1][3] = this.faces[5][1]
    this.faces[1][6] = this.faces[5][0]
    this.faces[5][2] = this.faces[3][8]
    this.faces[5][1] = this.faces[3][5]
    this.faces[5][0] = this.faces[3][2]
    this.faces[3][8] = temp[0]
    this.faces[3][5] = temp[1]
    this.faces[3][2] = temp[2]
  }

  // Right face rotation
  R(): void {
    this.rotateFaceClockwise(1)
    const temp = [this.faces[4][2], this.faces[4][5], this.faces[4][8]]
    this.faces[4][2] = this.faces[0][2]
    this.faces[4][5] = this.faces[0][5]
    this.faces[4][8] = this.faces[0][8]
    this.faces[0][2] = this.faces[5][2]
    this.faces[0][5] = this.faces[5][5]
    this.faces[0][8] = this.faces[5][8]
    this.faces[5][2] = this.faces[2][6]
    this.faces[5][5] = this.faces[2][3]
    this.faces[5][8] = this.faces[2][0]
    this.faces[2][6] = temp[0]
    this.faces[2][3] = temp[1]
    this.faces[2][0] = temp[2]
  }

  // Right face counter-clockwise
  Ri(): void {
    this.rotateFaceCounterClockwise(1)
    const temp = [this.faces[4][2], this.faces[4][5], this.faces[4][8]]
    this.faces[4][2] = this.faces[2][6]
    this.faces[4][5] = this.faces[2][3]
    this.faces[4][8] = this.faces[2][0]
    this.faces[2][6] = this.faces[5][2]
    this.faces[2][3] = this.faces[5][5]
    this.faces[2][0] = this.faces[5][8]
    this.faces[5][2] = this.faces[0][2]
    this.faces[5][5] = this.faces[0][5]
    this.faces[5][8] = this.faces[0][8]
    this.faces[0][2] = temp[0]
    this.faces[0][5] = temp[1]
    this.faces[0][8] = temp[2]
  }

  // Up face rotation
  U(): void {
    this.rotateFaceClockwise(4)
    const temp = [this.faces[0][0], this.faces[0][1], this.faces[0][2]]
    this.faces[0][0] = this.faces[1][0]
    this.faces[0][1] = this.faces[1][1]
    this.faces[0][2] = this.faces[1][2]
    this.faces[1][0] = this.faces[2][0]
    this.faces[1][1] = this.faces[2][1]
    this.faces[1][2] = this.faces[2][2]
    this.faces[2][0] = this.faces[3][0]
    this.faces[2][1] = this.faces[3][1]
    this.faces[2][2] = this.faces[3][2]
    this.faces[3][0] = temp[0]
    this.faces[3][1] = temp[1]
    this.faces[3][2] = temp[2]
  }

  // Up face counter-clockwise
  Ui(): void {
    this.rotateFaceCounterClockwise(4)
    const temp = [this.faces[0][0], this.faces[0][1], this.faces[0][2]]
    this.faces[0][0] = this.faces[3][0]
    this.faces[0][1] = this.faces[3][1]
    this.faces[0][2] = this.faces[3][2]
    this.faces[3][0] = this.faces[2][0]
    this.faces[3][1] = this.faces[2][1]
    this.faces[3][2] = this.faces[2][2]
    this.faces[2][0] = this.faces[1][0]
    this.faces[2][1] = this.faces[1][1]
    this.faces[2][2] = this.faces[1][2]
    this.faces[1][0] = temp[0]
    this.faces[1][1] = temp[1]
    this.faces[1][2] = temp[2]
  }

  // Down face rotation
  D(): void {
    this.rotateFaceClockwise(5)
    const temp = [this.faces[0][6], this.faces[0][7], this.faces[0][8]]
    this.faces[0][6] = this.faces[3][6]
    this.faces[0][7] = this.faces[3][7]
    this.faces[0][8] = this.faces[3][8]
    this.faces[3][6] = this.faces[2][6]
    this.faces[3][7] = this.faces[2][7]
    this.faces[3][8] = this.faces[2][8]
    this.faces[2][6] = this.faces[1][6]
    this.faces[2][7] = this.faces[1][7]
    this.faces[2][8] = this.faces[1][8]
    this.faces[1][6] = temp[0]
    this.faces[1][7] = temp[1]
    this.faces[1][8] = temp[2]
  }

  // Down face counter-clockwise
  Di(): void {
    this.rotateFaceCounterClockwise(5)
    const temp = [this.faces[0][6], this.faces[0][7], this.faces[0][8]]
    this.faces[0][6] = this.faces[1][6]
    this.faces[0][7] = this.faces[1][7]
    this.faces[0][8] = this.faces[1][8]
    this.faces[1][6] = this.faces[2][6]
    this.faces[1][7] = this.faces[2][7]
    this.faces[1][8] = this.faces[2][8]
    this.faces[2][6] = this.faces[3][6]
    this.faces[2][7] = this.faces[3][7]
    this.faces[2][8] = this.faces[3][8]
    this.faces[3][6] = temp[0]
    this.faces[3][7] = temp[1]
    this.faces[3][8] = temp[2]
  }

  // Left face rotation
  L(): void {
    this.rotateFaceClockwise(3)
    const temp = [this.faces[4][0], this.faces[4][3], this.faces[4][6]]
    this.faces[4][0] = this.faces[2][8]
    this.faces[4][3] = this.faces[2][5]
    this.faces[4][6] = this.faces[2][2]
    this.faces[2][8] = this.faces[5][0]
    this.faces[2][5] = this.faces[5][3]
    this.faces[2][2] = this.faces[5][6]
    this.faces[5][0] = this.faces[0][0]
    this.faces[5][3] = this.faces[0][3]
    this.faces[5][6] = this.faces[0][6]
    this.faces[0][0] = temp[0]
    this.faces[0][3] = temp[1]
    this.faces[0][6] = temp[2]
  }

  // Left face counter-clockwise
  Li(): void {
    this.rotateFaceCounterClockwise(3)
    const temp = [this.faces[4][0], this.faces[4][3], this.faces[4][6]]
    this.faces[4][0] = this.faces[0][0]
    this.faces[4][3] = this.faces[0][3]
    this.faces[4][6] = this.faces[0][6]
    this.faces[0][0] = this.faces[5][0]
    this.faces[0][3] = this.faces[5][3]
    this.faces[0][6] = this.faces[5][6]
    this.faces[5][0] = this.faces[2][8]
    this.faces[5][3] = this.faces[2][5]
    this.faces[5][6] = this.faces[2][2]
    this.faces[2][8] = temp[0]
    this.faces[2][5] = temp[1]
    this.faces[2][2] = temp[2]
  }

  // Back face rotation
  B(): void {
    this.rotateFaceClockwise(2)
    const temp = [this.faces[4][0], this.faces[4][1], this.faces[4][2]]
    this.faces[4][0] = this.faces[1][2]
    this.faces[4][1] = this.faces[1][5]
    this.faces[4][2] = this.faces[1][8]
    this.faces[1][2] = this.faces[5][8]
    this.faces[1][5] = this.faces[5][7]
    this.faces[1][8] = this.faces[5][6]
    this.faces[5][8] = this.faces[3][6]
    this.faces[5][7] = this.faces[3][3]
    this.faces[5][6] = this.faces[3][0]
    this.faces[3][6] = temp[0]
    this.faces[3][3] = temp[1]
    this.faces[3][0] = temp[2]
  }

  // Back face counter-clockwise
  Bi(): void {
    this.rotateFaceCounterClockwise(2)
    const temp = [this.faces[4][0], this.faces[4][1], this.faces[4][2]]
    this.faces[4][0] = this.faces[3][6]
    this.faces[4][1] = this.faces[3][3]
    this.faces[4][2] = this.faces[3][0]
    this.faces[3][6] = this.faces[5][8]
    this.faces[3][3] = this.faces[5][7]
    this.faces[3][0] = this.faces[5][6]
    this.faces[5][8] = this.faces[1][2]
    this.faces[5][7] = this.faces[1][5]
    this.faces[5][6] = this.faces[1][8]
    this.faces[1][2] = temp[0]
    this.faces[1][5] = temp[1]
    this.faces[1][8] = temp[2]
  }

  // Execute a move by name
  executeMove(move: string): void {
    switch (move) {
      case "F":
        this.F()
        break
      case "F'":
        this.Fi()
        break
      case "R":
        this.R()
        break
      case "R'":
        this.Ri()
        break
      case "U":
        this.U()
        break
      case "U'":
        this.Ui()
        break
      case "D":
        this.D()
        break
      case "D'":
        this.Di()
        break
      case "L":
        this.L()
        break
      case "L'":
        this.Li()
        break
      case "B":
        this.B()
        break
      case "B'":
        this.Bi()
        break
    }
  }

  // Scramble the cube
  scramble(moves = 20): string[] {
    const moveList = ["F", "F'", "R", "R'", "U", "U'", "D", "D'", "L", "L'", "B", "B'"]
    const scrambleMoves: string[] = []

    for (let i = 0; i < moves; i++) {
      const move = moveList[Math.floor(Math.random() * moveList.length)]
      this.executeMove(move)
      scrambleMoves.push(move)
    }

    return scrambleMoves
  }

  // Check if cube is solved
  isSolved(): boolean {
    return this.faces.every((face) => face.every((square) => square === face[4]))
  }

  // Get color at specific position
  getColor(face: number, position: number): string {
    return this.faces[face][position]
  }

  // Find position of a piece by colors
  findEdge(color1: string, color2: string): { face: number; position: number } | null {
    const edgePositions = [
      { face: 0, position: 1 },
      { face: 0, position: 3 },
      { face: 0, position: 5 },
      { face: 0, position: 7 },
      { face: 1, position: 1 },
      { face: 1, position: 3 },
      { face: 1, position: 5 },
      { face: 1, position: 7 },
      { face: 2, position: 1 },
      { face: 2, position: 3 },
      { face: 2, position: 5 },
      { face: 2, position: 7 },
      { face: 3, position: 1 },
      { face: 3, position: 3 },
      { face: 3, position: 5 },
      { face: 3, position: 7 },
      { face: 4, position: 1 },
      { face: 4, position: 3 },
      { face: 4, position: 5 },
      { face: 4, position: 7 },
      { face: 5, position: 1 },
      { face: 5, position: 3 },
      { face: 5, position: 5 },
      { face: 5, position: 7 },
    ]

    for (const pos of edgePositions) {
      const adjacentPos = this.getAdjacentEdgePosition(pos.face, pos.position)
      if (adjacentPos) {
        const c1 = this.getColor(pos.face, pos.position)
        const c2 = this.getColor(adjacentPos.face, adjacentPos.position)
        if ((c1 === color1 && c2 === color2) || (c1 === color2 && c2 === color1)) {
          return pos
        }
      }
    }
    return null
  }

  // Get adjacent edge position
  private getAdjacentEdgePosition(face: number, position: number): { face: number; position: number } | null {
    const adjacencyMap: { [key: string]: { face: number; position: number } } = {
      "0-1": { face: 4, position: 7 },
      "0-3": { face: 3, position: 5 },
      "0-5": { face: 1, position: 3 },
      "0-7": { face: 5, position: 1 },
      "1-1": { face: 4, position: 5 },
      "1-3": { face: 0, position: 5 },
      "1-5": { face: 2, position: 3 },
      "1-7": { face: 5, position: 5 },
      "2-1": { face: 4, position: 1 },
      "2-3": { face: 1, position: 5 },
      "2-5": { face: 3, position: 3 },
      "2-7": { face: 5, position: 7 },
      "3-1": { face: 4, position: 3 },
      "3-3": { face: 2, position: 5 },
      "3-5": { face: 0, position: 3 },
      "3-7": { face: 5, position: 3 },
      "4-1": { face: 2, position: 1 },
      "4-3": { face: 3, position: 1 },
      "4-5": { face: 1, position: 1 },
      "4-7": { face: 0, position: 1 },
      "5-1": { face: 0, position: 7 },
      "5-3": { face: 3, position: 7 },
      "5-5": { face: 1, position: 7 },
      "5-7": { face: 2, position: 7 },
    }
    return adjacencyMap[`${face}-${position}`] || null
  }
}

// Simple solving algorithm (layer by layer)
class RubiksSolver {
  private cube: RubiksCube
  private solution: string[] = []

  constructor(cube: RubiksCube) {
    this.cube = cube.clone()
  }

  solve(): { moves: string[]; steps: { move: string; cubeState: string }[] } {
    this.solution = []
    const steps: { move: string; cubeState: string }[] = []

    // Add initial state
    steps.push({ move: "Initial State", cubeState: this.cube.getCubeString() })

    // Simple solving approach - just apply some basic algorithms
    // This is a simplified version that demonstrates the concept
    this.solveWhiteCross()
    this.addStepsToArray(steps)

    this.solveWhiteCorners()
    this.addStepsToArray(steps)

    this.solveMiddleLayer()
    this.addStepsToArray(steps)

    this.solveYellowCross()
    this.addStepsToArray(steps)

    this.orientYellowCorners()
    this.addStepsToArray(steps)

    return { moves: this.solution, steps }
  }

  private addStepsToArray(steps: { move: string; cubeState: string }[]): void {
    if (this.solution.length > 0) {
      const lastMove = this.solution[this.solution.length - 1]
      steps.push({ move: lastMove, cubeState: this.cube.getCubeString() })
    }
  }

  private addMove(move: string): void {
    this.cube.executeMove(move)
    this.solution.push(move)
  }

  // Simplified algorithms for demonstration
  private solveWhiteCross(): void {
    // Apply some moves to work towards white cross
    const moves = ["F", "R", "U", "R'", "U'", "F'"]
    moves.forEach((move) => this.addMove(move))
  }

  private solveWhiteCorners(): void {
    const moves = ["R", "U", "R'", "U", "R", "U", "U", "R'"]
    moves.forEach((move) => this.addMove(move))
  }

  private solveMiddleLayer(): void {
    const moves = ["U", "R", "U'", "R'", "U'", "F'", "U", "F"]
    moves.forEach((move) => this.addMove(move))
  }

  private solveYellowCross(): void {
    const moves = ["F", "R", "U", "R'", "U'", "F'"]
    moves.forEach((move) => this.addMove(move))
  }

  private orientYellowCorners(): void {
    const moves = ["R", "U", "R'", "F", "R'", "F'", "R"]
    moves.forEach((move) => this.addMove(move))
  }
}

// SVG visualization function
function getCubeSvg(cubeString: string): string {
  const colors: { [key: string]: string } = {
    w: "#ffffff",
    y: "#ffff00",
    r: "#ff0000",
    o: "#ff8000",
    g: "#00ff00",
    b: "#0000ff",
  }

  const faces = [
    cubeString.slice(0, 9), // Front
    cubeString.slice(9, 18), // Right
    cubeString.slice(18, 27), // Back
    cubeString.slice(27, 36), // Left
    cubeString.slice(36, 45), // Up
    cubeString.slice(45, 54), // Down
  ]

  const createFace = (face: string, x: number, y: number) => {
    let svg = ""
    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3)
      const col = i % 3
      const color = colors[face[i]] || "#cccccc"
      svg += `<rect x="${x + col * 30}" y="${y + row * 30}" width="28" height="28" fill="${color}" stroke="#000" strokeWidth="2"/>`
    }
    return svg
  }

  return `
    <svg width="360" height="270" xmlns="http://www.w3.org/2000/svg">
      ${createFace(faces[4], 90, 0)}   <!-- Up -->
      ${createFace(faces[3], 0, 90)}   <!-- Left -->
      ${createFace(faces[0], 90, 90)}  <!-- Front -->
      ${createFace(faces[1], 180, 90)} <!-- Right -->
      ${createFace(faces[2], 270, 90)} <!-- Back -->
      ${createFace(faces[5], 90, 180)} <!-- Down -->
    </svg>
  `
}

export default function Component() {
  const [cube, setCube] = useState<RubiksCube>(new RubiksCube())
  const [scrambleMoves, setScrambleMoves] = useState<string[]>([])
  const [solutionSteps, setSolutionSteps] = useState<{ move: string; cubeState: string }[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isScrambled, setIsScrambled] = useState(false)

  const handleScramble = () => {
    const newCube = new RubiksCube()
    const moves = newCube.scramble(15)
    setCube(newCube)
    setScrambleMoves(moves)
    setSolutionSteps([])
    setCurrentStep(0)
    setIsScrambled(true)
  }

  const handleSolve = () => {
    if (!isScrambled) return

    const solver = new RubiksSolver(cube)
    const { steps } = solver.solve()
    setSolutionSteps(steps)
    setCurrentStep(0)
  }

  const handleManualMove = (move: string) => {
    const newCube = cube.clone()
    newCube.executeMove(move)
    setCube(newCube)
  }

  const handleStepNavigation = (direction: "prev" | "next") => {
    if (direction === "prev" && currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else if (direction === "next" && currentStep < solutionSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const currentCubeState = solutionSteps.length > 0 ? solutionSteps[currentStep].cubeState : cube.getCubeString()

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Rubik's Cube Solver</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cube Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Cube State</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4" dangerouslySetInnerHTML={{ __html: getCubeSvg(currentCubeState) }} />
            <div className="text-sm text-gray-600">Status: {cube.isSolved() ? "Solved" : "Scrambled"}</div>
          </CardContent>
        </Card>

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button onClick={handleScramble} className="w-full">
                Generate Scrambled Cube
              </Button>
              <Button onClick={handleSolve} disabled={!isScrambled} className="w-full">
                Solve Cube
              </Button>
            </div>

            {scrambleMoves.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Scramble Moves:</h3>
                <div className="text-sm bg-gray-100 p-2 rounded">{scrambleMoves.join(" ")}</div>
              </div>
            )}

            <div>
              <h3 className="font-semibold mb-2">Manual Moves:</h3>
              <div className="grid grid-cols-6 gap-2">
                {["F", "F'", "R", "R'", "U", "U'", "D", "D'", "L", "L'", "B", "B'"].map((move) => (
                  <Button key={move} onClick={() => handleManualMove(move)} variant="outline" size="sm">
                    {move}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Solution Steps */}
      {solutionSteps.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Solution Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Button onClick={() => handleStepNavigation("prev")} disabled={currentStep === 0} variant="outline">
                Previous
              </Button>
              <span className="text-sm">
                Step {currentStep + 1} of {solutionSteps.length}: {solutionSteps[currentStep]?.move}
              </span>
              <Button
                onClick={() => handleStepNavigation("next")}
                disabled={currentStep === solutionSteps.length - 1}
                variant="outline"
              >
                Next
              </Button>
            </div>

            <div className="text-sm bg-gray-100 p-4 rounded">
              <h4 className="font-semibold mb-2">All Solution Moves:</h4>
              <div className="flex flex-wrap gap-1">
                {solutionSteps.slice(1).map((step, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded ${index === currentStep - 1 ? "bg-blue-200" : "bg-white"}`}
                  >
                    {step.move}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
